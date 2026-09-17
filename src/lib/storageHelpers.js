import { supabase } from './supabase'

/**
 * Extract file path from Supabase Storage URL
 * @param {string} url - Full Supabase storage URL
 * @returns {string|null} - File path or null if invalid
 */
export const extractStoragePath = (url) => {
  if (!url) return null
  
  try {
    // URL format: https://xxx.supabase.co/storage/v1/object/public/bucket-name/path/to/file.jpg
    const bucketMatch = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/)
    
    if (bucketMatch && bucketMatch.length >= 3) {
      return {
        bucket: bucketMatch[1],
        path: bucketMatch[2]
      }
    }
    
    return null
  } catch (error) {
    console.error('Error extracting storage path:', error)
    return null
  }
}

/**
 * Delete image from Supabase Storage
 * @param {string} imageUrl - Full image URL from Supabase Storage
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export const deleteImageFromStorage = async (imageUrl) => {
  try {

    const storageInfo = extractStoragePath(imageUrl)

    if (!storageInfo) {
      return { success: false }
    }

    const { error } = await supabase.storage
      .from(storageInfo.bucket)
      .remove([storageInfo.path])

    if (error) return { success: false, error }

    return { success: true }

  } catch (error) {
    return { success: false, error }
  }
}


/**
 * Delete multiple images from Supabase Storage
 * @param {string[]} imageUrls - Array of image URLs
 * @returns {Promise<{success: boolean, deleted: number, failed: number}>}
 */
export const deleteMultipleImages = async (imageUrls) => {
  const results = {
    success: true,
    deleted: 0,
    failed: 0,
    errors: []
  }

  for (const url of imageUrls) {
    const result = await deleteImageFromStorage(url)
    
    if (result.success) {
      results.deleted++
    } else {
      results.failed++
      results.errors.push({ url, error: result.error })
    }
  }

  if (results.failed > 0) {
    results.success = false
  }

  return results
}

/**
 * Upload image to Supabase Storage
 * @param {File} file - File object to upload
 * @param {string} bucket - Bucket name (default: 'product-images')
 * @param {string} folder - Folder path (default: 'products')
 * @returns {Promise<{success: boolean, url?: string, error?: any}>}
 */
export const uploadImageToStorage = async (file, bucket = 'product-images', folder = 'products') => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return { success: false, error }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl, path: filePath }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { success: false, error }
  }
}

/**
 * Replace image in Supabase Storage (delete old, upload new)
 * @param {string} oldImageUrl - Old image URL to delete
 * @param {File} newFile - New file to upload
 * @param {string} bucket - Bucket name
 * @param {string} folder - Folder path
 * @returns {Promise<{success: boolean, url?: string, error?: any}>}
 */
export const replaceImage = async (oldImageUrl, newFile, bucket = 'product-images', folder = 'products') => {
  try {
    // Delete old image
    if (oldImageUrl && oldImageUrl.includes('supabase')) {
      await deleteImageFromStorage(oldImageUrl)
    }

    // Upload new image
    const uploadResult = await uploadImageToStorage(newFile, bucket, folder)
    
    return uploadResult
  } catch (error) {
    console.error('Error replacing image:', error)
    return { success: false, error }
  }
}

/**
 * Check if file is a valid image
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB (default: 5)
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
export const validateImageFile = async (file, maxSizeMB = 5) => {
  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image (PNG, JPG, WEBP, GIF)' }
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `Image size must be less than ${maxSizeMB}MB` }
  }

  return { valid: true }
}

/**
 * Get storage usage stats
 * @param {string} bucket - Bucket name
 * @returns {Promise<{files: number, totalSize: number, error?: any}>}
 */
export const getStorageStats = async (bucket = 'product-images') => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list()

    if (error) {
      return { files: 0, totalSize: 0, error }
    }

    const totalSize = data.reduce((sum, file) => sum + (file.metadata?.size || 0), 0)
    
    return {
      files: data.length,
      totalSize,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2)
    }
  } catch (error) {
    console.error('Error getting storage stats:', error)
    return { files: 0, totalSize: 0, error }
  }
}

/**
 * Format file size to human readable
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Download image from URL
 * @param {string} url - Image URL
 * @param {string} filename - Desired filename
 */
export const downloadImage = async (url, filename) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading image:', error)
    throw error
  }
}

export default {
  extractStoragePath,
  deleteImageFromStorage,
  deleteMultipleImages,
  uploadImageToStorage,
  replaceImage,
  validateImageFile,
  getStorageStats,
  formatFileSize,
  downloadImage
}