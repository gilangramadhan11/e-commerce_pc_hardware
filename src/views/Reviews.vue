<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Customer Reviews</h1>
        <p class="text-gray-600 mt-1">Manage and respond to customer feedback</p>
      </div>
      <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        <i class="bx bx-download text-xl"></i>
        Export Reviews
      </button>
    </div>

    <!-- Review Stats -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Reviews</p>
            <p class="text-2xl font-bold text-gray-800">1,456</p>
          </div>
          <i class="bx bx-star text-3xl text-blue-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Avg. Rating</p>
            <p class="text-2xl font-bold text-gray-800">4.7</p>
          </div>
          <div class="flex text-yellow-500">
            <i class="bx bxs-star text-2xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">5 Stars</p>
            <p class="text-2xl font-bold text-gray-800">89%</p>
          </div>
          <i class="bx bx-trending-up text-3xl text-green-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">With Photos</p>
            <p class="text-2xl font-bold text-gray-800">567</p>
          </div>
          <i class="bx bx-image text-3xl text-purple-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Pending</p>
            <p class="text-2xl font-bold text-gray-800">45</p>
          </div>
          <i class="bx bx-time text-3xl text-orange-500"></i>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Flagged</p>
            <p class="text-2xl font-bold text-gray-800">8</p>
          </div>
          <i class="bx bx-flag text-3xl text-red-500"></i>
        </div>
      </div>
    </div>

    <!-- Rating Distribution -->
    <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 w-24">
            <span class="text-sm font-medium text-gray-700">5</span>
            <i class="bx bxs-star text-yellow-500"></i>
          </div>
          <div class="flex-1 bg-gray-200 rounded-full h-3">
            <div class="bg-green-500 h-3 rounded-full" style="width: 89%"></div>
          </div>
          <span class="text-sm font-semibold text-gray-700 w-16 text-right">1,296 (89%)</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 w-24">
            <span class="text-sm font-medium text-gray-700">4</span>
            <i class="bx bxs-star text-yellow-500"></i>
          </div>
          <div class="flex-1 bg-gray-200 rounded-full h-3">
            <div class="bg-blue-500 h-3 rounded-full" style="width: 7%"></div>
          </div>
          <span class="text-sm font-semibold text-gray-700 w-16 text-right">102 (7%)</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 w-24">
            <span class="text-sm font-medium text-gray-700">3</span>
            <i class="bx bxs-star text-yellow-500"></i>
          </div>
          <div class="flex-1 bg-gray-200 rounded-full h-3">
            <div class="bg-yellow-500 h-3 rounded-full" style="width: 2%"></div>
          </div>
          <span class="text-sm font-semibold text-gray-700 w-16 text-right">29 (2%)</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 w-24">
            <span class="text-sm font-medium text-gray-700">2</span>
            <i class="bx bxs-star text-yellow-500"></i>
          </div>
          <div class="flex-1 bg-gray-200 rounded-full h-3">
            <div class="bg-orange-500 h-3 rounded-full" style="width: 1%"></div>
          </div>
          <span class="text-sm font-semibold text-gray-700 w-16 text-right">15 (1%)</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 w-24">
            <span class="text-sm font-medium text-gray-700">1</span>
            <i class="bx bxs-star text-yellow-500"></i>
          </div>
          <div class="flex-1 bg-gray-200 rounded-full h-3">
            <div class="bg-red-500 h-3 rounded-full" style="width: 1%"></div>
          </div>
          <span class="text-sm font-semibold text-gray-700 w-16 text-right">14 (1%)</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4">
      <div class="flex-1">
        <input 
          type="text" 
          placeholder="Search reviews by product, customer..." 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>All Ratings</option>
        <option>5 Stars</option>
        <option>4 Stars</option>
        <option>3 Stars</option>
        <option>2 Stars</option>
        <option>1 Star</option>
      </select>
      <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>All Status</option>
        <option>Published</option>
        <option>Pending</option>
        <option>Flagged</option>
      </select>
    </div>

    <!-- Reviews List -->
    <div class="space-y-4">
      <!-- Review 1 - 5 Stars with Photo -->
      <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start gap-4 flex-1">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-blue-600">MR</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-gray-800">Michael Roberts</h4>
                <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Verified Purchase</span>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <div class="flex text-yellow-500">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                </div>
                <span class="text-sm text-gray-500">Feb 6, 2024</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">
                Product: <span class="font-semibold text-gray-800">Intel Core i9-13900K</span>
              </p>
            </div>
          </div>
          <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            Published
          </span>
        </div>

        <div class="mb-4">
          <h5 class="font-semibold text-gray-800 mb-2">Excellent Performance!</h5>
          <p class="text-gray-700 leading-relaxed">
            This CPU is absolutely incredible! The performance is outstanding for both gaming and video editing. 
            Installation was straightforward, and temps are manageable with good cooling. Highly recommend for 
            anyone building a high-end PC. Worth every penny!
          </p>
        </div>

        <!-- Review Photos -->
        <div class="flex gap-3 mb-4">
          <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
              <i class="bx bx-image text-3xl"></i>
            </div>
          </div>
          <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 text-white">
              <i class="bx bx-image text-3xl"></i>
            </div>
          </div>
        </div>

        <!-- Helpful & Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <i class="bx bx-like"></i>
              <span>Helpful (23)</span>
            </button>
            <button class="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <i class="bx bx-message-dots"></i>
              <span>Reply</span>
            </button>
          </div>
          <div class="flex gap-2">
            <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <i class="bx bx-edit-alt"></i>
            </button>
            <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Review 2 - 4 Stars -->
      <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start gap-4 flex-1">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-purple-600">SK</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-gray-800">Sarah Kim</h4>
                <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Verified Purchase</span>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <div class="flex text-yellow-500">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bx-star"></i>
                </div>
                <span class="text-sm text-gray-500">Feb 5, 2024</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">
                Product: <span class="font-semibold text-gray-800">NVIDIA RTX 4090</span>
              </p>
            </div>
          </div>
          <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            Published
          </span>
        </div>

        <div class="mb-4">
          <h5 class="font-semibold text-gray-800 mb-2">Great GPU but runs hot</h5>
          <p class="text-gray-700 leading-relaxed">
            Amazing graphics card with incredible performance in 4K gaming. However, it does run quite hot 
            under heavy load. Make sure you have excellent cooling. Overall very satisfied with the purchase.
          </p>
        </div>

        <!-- Helpful & Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <i class="bx bx-like"></i>
              <span>Helpful (15)</span>
            </button>
            <button class="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <i class="bx bx-message-dots"></i>
              <span>Reply</span>
            </button>
          </div>
          <div class="flex gap-2">
            <button class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <i class="bx bx-edit-alt"></i>
            </button>
            <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Review 3 - Pending -->
      <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 border-orange-500">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start gap-4 flex-1">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-green-600">JL</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-gray-800">James Lee</h4>
                <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Verified Purchase</span>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <div class="flex text-yellow-500">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                </div>
                <span class="text-sm text-gray-500">Feb 6, 2024</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">
                Product: <span class="font-semibold text-gray-800">Corsair Vengeance 32GB DDR5</span>
              </p>
            </div>
          </div>
          <span class="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
            Pending Review
          </span>
        </div>

        <div class="mb-4">
          <h5 class="font-semibold text-gray-800 mb-2">Best RAM for the price!</h5>
          <p class="text-gray-700 leading-relaxed">
            Excellent RAM kit with great performance. XMP profile worked perfectly. No issues at all. 
            Would definitely recommend to anyone building a new PC.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <div class="flex gap-3">
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <i class="bx bx-check"></i> Approve
            </button>
            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <i class="bx bx-x"></i> Reject
            </button>
          </div>
          <button class="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors">
            <i class="bx bx-dots-horizontal-rounded text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Review 4 - Low Rating Flagged -->
      <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 border-red-500">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start gap-4 flex-1">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-red-600">TD</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-gray-800">Tom Davis</h4>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <div class="flex text-yellow-500">
                  <i class="bx bxs-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                </div>
                <span class="text-sm text-gray-500">Feb 4, 2024</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">
                Product: <span class="font-semibold text-gray-800">Samsung 990 PRO 2TB</span>
              </p>
            </div>
          </div>
          <span class="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
            <i class="bx bx-flag"></i>
            Flagged
          </span>
        </div>

        <div class="mb-4">
          <h5 class="font-semibold text-gray-800 mb-2">Disappointed</h5>
          <p class="text-gray-700 leading-relaxed">
            Drive failed after 2 weeks. Customer service was unhelpful. Would not recommend.
          </p>
        </div>

        <!-- Admin Response -->
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <div class="flex items-start gap-3">
            <i class="bx bx-info-circle text-blue-600 text-xl flex-shrink-0 mt-1"></i>
            <div>
              <p class="text-sm font-semibold text-blue-900 mb-1">Admin Response Needed</p>
              <p class="text-sm text-blue-800">This review has been flagged. Please respond or take action.</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <div class="flex gap-3">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <i class="bx bx-message-dots"></i> Respond
            </button>
            <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              <i class="bx bx-phone"></i> Contact Customer
            </button>
          </div>
          <button class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
            <i class="bx bx-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
      <p class="text-sm text-gray-700">
        Showing <span class="font-medium">1</span> to <span class="font-medium">4</span> of <span class="font-medium">1,456</span> reviews
      </p>
      <div class="flex gap-2">
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
        <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
        <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reviews logic
</script>