<template>
  <div class="min-h-screen bg-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary-900">
        AYM Connect
      </h2>
      <p class="mt-2 text-center text-sm text-secondary-600">
        Youth Ministry Management
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-secondary-100">
        <slot />
      </div>
    </div>
  </div>
</template>
