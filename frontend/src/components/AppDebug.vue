<template>
  <p class="mt-5 d-flex gap-2">
    <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        v-model="debug"
        id="myDebug"
    />
    <label for="myDebug">
      {{ name }}
    </label>
  </p>
  <pre v-if="debug">
    {{ datas }}
  </pre>
</template>

<script>
export default {
  props: {
    datas: {
      type: [Number, String, Array, Object, null],
      required: true,
    },
    name: {
      type: String,
      default: "Debug",
    },
  },
  data() {
    return {
      debug: false,
    };
  },
};
</script>
