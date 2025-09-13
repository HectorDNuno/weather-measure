<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive" class="modal-container">
        <Transition name="modal-inner">
          <div v-if="modalActive" class="modal-content">
            <slot />
            <button @click="$emit('close-modal')">Close</button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(['close-modal']);

defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="css" scoped>
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 1rem;
}

.modal-container .modal-content {
  align-self: flex-start;
  margin-top: 8rem;
  max-width: 768px;
  padding: 2rem;
  background: #fff;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  letter-spacing: 2px;
}

.modal-content button {
  width: 25%;
  margin-top: 2rem;
  padding: 10px 0;
  cursor: pointer;
  outline: none;
  border: 3px solid #000;
  border-radius: 10px;
  background: #3300ff;
  color: #fff;
  font-size: 1rem;
  letter-spacing: 2px;
}

.modal-content button:hover {
  background: #4185f4;
}

.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
