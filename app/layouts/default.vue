<template>
  <UHeader :toggle="false">
    <template #title> Jobs </template>
    <template #right>
      <NavBar />
    </template>
  </UHeader>

  <main class="container mx-auto px-4 py-8">
    <slot></slot>
  </main>
</template>

<script setup lang="ts"></script>

<style></style>
