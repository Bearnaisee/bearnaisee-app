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
        <input v-model="recipe.title" type="text" />
      </div>

      <div>
        <h6>Description</h6>

        <textarea v-model="recipe.description" type="text" rows="5" />
      </div>

      <div>
        <div class="slider">
          <h6>Estimated time</h6>
          <p>{{ recipe.estimatedTime }} min.</p>
        </div>

        <input v-model.number="recipe.estimatedTime" type="range" min="0" step="5" max="240" />
      </div>

      <div>
        <h6>Tags</h6>
        <input type="text" />
      </div>

      <div>
        <div class="ingredients">
          <h6>Ingredient</h6>

          <h6>Amount</h6>

          <h6>Metric</h6>

          <template v-for="(ingredient, ingredientIndex) of recipe.ingredients" :key="ingredientIndex">
            <input v-model="ingredient.ingredient" type="text" style="width: auto;" />

            <input v-model.number="ingredient.amount" type="number"/>

            <select v-model="ingredient.metricId">
              <option v-for="metric of getMetrics" :key="metric.id" :value="metric.id">
                {{ metric.metric }}
              </option>
            </select>
          </template>
        </div>

        <Button label="Add ingredient" class="add-step" kind="secondary" @click="addIngredient" style="margin-top: 0.3rem;"/>
      </div>

      <div class="steps">
        <h6>Steps</h6>

        <div v-for="(step, stepIndex) of recipe.steps" :key="stepIndex" class="description">
          <p>Step: {{ stepIndex + 1 }}</p>

          <textarea v-model="step.content" type="text" placeholder="..." rows="5"></textarea>
          <div class="optional">
          <p>Optional</p>
          <input v-model="step.optional" type="checkbox" />
          </div>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RecipeBuilder',

  components: {
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
  },

  data() {
    return {
      metrics: [],

      recipe: {
        title: '',
        description: '',
        coverImage: null,
        estimatedTime: 0,
        ingredients: [
          {
            amount: null,
            metricId: null,
            ingredientId: null,
            ingredient: '',
            optional: false,
          },
        ],
        steps: [],
      },
    };
  },

  computed: {
    ...mapGetters(['getMetrics']),

    uploadImageBackground() {
      if (this.recipe?.coverImage) {
        return `background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
          url('${this.recipe.coverImage}');`;
      }

      return 'background-color: rgba(0, 0, 0, 5%);';
    },
  },

  created() {
    if (!this.getMetrics?.length) {
      this.fetchMetrics();
    }
  },

  methods: {
    ...mapActions(['fetchMetrics']),

    addStep() {
      this.recipe.steps.push({
        content: '',
        optional: false,
      });
    },

    addIngredient() {
      this.recipe.ingredients.push({
        amount: null,
        metricId: null,
        ingredientId: null,
        ingredient: '',
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
    padding: 00.25rem;
    font-family: "Poppins", sans-serif;
  }

  input {
    border-color: rgba(126, 126, 126, 0.3);
    border-radius: 4px;
    border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
    width: 100%;
    height: 2rem;
    padding: 0.25rem;
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

  // Add ingredients
  .ingredients {
    display: grid;
    grid: auto-flow / 0fr 0.6fr 0fr;
    justify-content: space-between;
    row-gap: 0.3rem;
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

    .optional{
      display: flex;
    align-items: center;
    gap: 0.5rem;
    }

    input[type=checkbox] {
	       cursor: pointer;
         width: 1.5rem;
         height: 1.5rem;
         appearance: none;
         
    
}
input[type=checkbox]:before {
         content: '\2714';
         color:transparent;
         padding: 0.1em;
         padding-bottom: 0.2em;
         
}
input[type=checkbox]:checked:before {
         background-color: rgba($color: #ff7d61, $alpha: 0.3);
         color: #ffffff;
}
  }

  // Save and upload buttons

  .btns {
    display: inline-grid;
    grid: auto-flow / 2fr 2fr;
    column-gap: 1rem;
    padding: 3rem 1rem;

    Button {
      font-size: 1rem;
      
    }
  }
}
</style>
