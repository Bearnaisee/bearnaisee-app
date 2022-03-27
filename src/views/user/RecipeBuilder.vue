<template>
  <div class="recipe-builder">
    <h2>Upload new recipe</h2>

    <div class="cover-upload" :style="uploadImageBackground">
      <label>
        <Icon icon="upload" width="56" height="auto" />
        <h5>Upload image</h5>

        <p>Click here to upload cover image</p>

        <input type="file" accept="image/*" @change="uploadRecipeThumbnail($event.target.files)" />
      </label>
    </div>

    <div class="builder">
      <div>
        <h6>Recipe name</h6>
        <input type="text" />
      </div>
      <div>
        <h6>Description</h6>

        <textarea type="text" rows="5" />
      </div>
      <div>
        <div class="slider">
          <h6>Estimated time</h6>
          <p>{{ time }} min.</p>
        </div>
        <input v-model.number="time" type="range" min="0" step="5" max="120" />
      </div>

      <div>
        <h6>Tags</h6>
        <input type="text" />
      </div>

      <div>
        <div class="ingredients">
          <div>
            <h6>Add ingredients</h6>
            <input type="text" class="add-ingredients" />
          </div>
          <div>
            <h6>Amount</h6>
            <input type="text" class="amount" />
          </div>
        </div>
      </div>
      <div class="steps">
        <h6>Steps</h6>
        <div v-for="(step, stepIndex) of steps" :key="stepIndex" class="description">
          <p>Step: {{ stepIndex + 1 }}</p>
          <textarea v-model="step.content" type="text" placeholder="..." rows="5"></textarea>
          <p>Optional</p>
          <input v-model="step.optional" type="checkbox" />
        </div>

        <Button kind="primary" label="+ Add step" class="add-step" @click="addStep" />
      </div>
    </div>
    <div class="btns">
      <Button kind="secondary" label="Save draft" />
      <Button kind="primary" label="Upload" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import uploadImage from '@/helpers/uploadImage';

export default {
  name: 'RecipeBuilder',

  components: {
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
  },

  data() {
    return {
      time: 0,
      steps: [],

      recipe: {
        coverImage: null,
      },
    };
  },

  computed: {
    uploadImageBackground() {
      if (this.recipe?.coverImage) {
        return `background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
          url('${this.recipe.coverImage}');`;
      }

      return 'background-color: rgba(0, 0, 0, 5%);';
    },
  },
  methods: {
    addStep() {
      this.steps.push({
        content: '',
        optional: false,
      });
    },

    async uploadRecipeThumbnail(files) {
      if (files?.length) {
        const result = await uploadImage(files[0]);

        if (result?.file_name?.length && result?.bucket_name?.length) {
          this.recipe.coverImage = `https://${result.bucket_name}.s3.eu-central-1.amazonaws.com/${result.file_name}`;
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error uploading image',
            timer: 800,
            showConfirmButton: false,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe-builder {
  display: grid;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  gap: 1.25rem;

  // Image upload
  .cover-upload {
    border: rgba(126, 126, 126, 30%);
    border-style: dashed;
    border-width: 2px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    object-fit: cover !important;
    background-size: cover !important;
    object-position: center !important;
    background-repeat: no-repeat !important;
    width: 85vw;

    label {
      align-items: center;
      height: 100%;
      margin-left: 0 !important;
      justify-content: center;
      cursor: pointer;
      flex-direction: column;
      width: 100% !important;
      object-fit: cover;
      display: flex;
      padding: 2rem;

      h5 {
        color: rgba(0, 0, 0, 0.5);
        font-weight: 700;
        font-size: 14px;
        margin-top: 2vh;
      }

      p {
        color: rgba(0, 0, 0, 0.2);
        font-size: 12px;
      }

      input {
        position: absolute;
        visibility: hidden;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  h6 {
    color: rgba(0, 0, 0, 0.2);
    font-size: 14px;
    margin-top: 1.25rem;
  }

  textarea {
    border-color: rgba(126, 126, 126, 0.3);
    border-radius: 4px;
    border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
    width: 100%;
    resize: vertical;
  }

  input {
    border-color: rgba(126, 126, 126, 0.3);
    border-radius: 4px;
    border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
    width: 100%;
    height: 2rem;
  }

  // Estimated time slider
  .slider {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      color: rgba(0, 0, 0, 0.5);
      font-weight: 700;
      font-size: 14px;
      margin-top: 1.25rem;
    }
  }

  input[type='range'] {
    height: 25px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
    border: none;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: rgba($color: #7e7e7e, $alpha: 0.3);
    border-radius: 1px;
    border: 0px solid #000000;
  }

  input[type='range']::-webkit-slider-thumb {
    // Slider thump
    box-shadow: 0px 0px 0px #000000;
    border: 4px solid #ff7d61;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #ff7d61;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: #ff7d61;
    border-radius: 1px;
    border: 0px solid #000000;
  }

  input[type='range']::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #ff7d61;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #ff7d61;
    cursor: pointer;
  }

  input[type='range']::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type='range']::-ms-fill-lower {
    background: #ff7d61;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type='range']::-ms-fill-upper {
    background: #ff7d61;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type='range']::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #ff7d61;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #ff7d61;
    cursor: pointer;
  }
  input[type='range']:focus::-ms-fill-lower {
    background: #ff7d61;
  }
  input[type='range']:focus::-ms-fill-upper {
    background: #ff7d61;
  }

  // Add ingradients
  .ingredients {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  // Steps

  .steps {
    p {
      color: rgba($color: #000000, $alpha: 0.5);
      font-size: 0.75rem;
      font-weight: 400;
    }

    .add-step {
      height: auto;
      font-weight: 400 !important;
      padding: 0.25rem 0.5rem;
      margin-top: 0.5rem;
    }

    textarea {
      width: 100%;
      resize: vertical;
    }

    input[type='checkbox'] {
      border-color: rgba(126, 126, 126, 0.3);
      border-radius: 4px;
      border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
      background-color: red;

      .description {
        display: flex;
      }

      input[type='checkbox']:checked {
        background-color: deeppink;
      }
    }
  }

  // Save and upload buttons

  .btns {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1.25rem;

    Button {
      padding: 0.25rem 2.5rem;
      font-size: 1rem;
    }
  }
}
</style>
