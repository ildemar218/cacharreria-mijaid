<template>
    <div class="d-flex flex-column vh-100">
  
      <Navbar />
  
      <div class="container-fluid flex-grow-1">
        <div class="row h-100">
  
          <div class="col-md-3 col-lg-2 p-0">
            <Sidebar />
          </div>
  
          <div class="col-md-9 col-lg-10 p-4">
  
            <RouterView />
  
          </div>
  
        </div>
      </div>
  
      <Footer />
  
    </div>
  </template>
  
  <script setup>
  import Navbar from '@/components/layout/Navbar.vue'
  import Sidebar from '@/components/layout/Sidebar.vue'
  import Footer from '@/components/layout/Footer.vue'
  </script>
  
  <style scoped>
  </style>