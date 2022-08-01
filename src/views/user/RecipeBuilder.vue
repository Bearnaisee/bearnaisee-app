<template>
  <div class="flex">
    <div class="left">
      <SideNav />
    </div>
    <div class="middle">
      <div class="recipe-builder">
        <h2>{{ getEditRecipeId !== null && getEditRecipeId !== undefined ? 'Edit' : 'Create' }} recipe</h2>

        <div class="cover-upload" :style="uploadImageBackground">
          <label>
            <Icon icon="upload" width="56" height="56" />
            <h5>Upload image</h5>

            <p>Click here to upload cover image</p>

            <input type="file" accept="image/*" @change="uploadRecipeThumbnail($event.target.files)" />
          </label>
        </div>

        <div class="builder">
          <div>
            <h6>Recipe name</h6>

            <input v-model="recipe.title" type="text" maxlength="100" required />
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

            <input v-model="newTag" type="text" maxlength="45" @keydown.enter="addTag" />

            <div v-if="recipe?.tags?.length" class="tags__list">
              <Tag v-for="(tag, tagIndex) of recipe.tags" :key="tagIndex" :label="tag" @click="removeTag(tagIndex)" />
            </div>
          </div>

          <div>
            <div class="ingredients">
              <h6>Ingredient</h6>

              <h6>Amount</h6>

              <h6>Metric</h6>

              <div></div>

              <template v-for="(ingredient, ingredientIndex) of recipe.ingredients" :key="ingredientIndex">
                <input v-model="ingredient.ingredient" type="text" style="width: auto" maxlength="255" />

                <input v-model.number="ingredient.amount" type="number" />

                <select v-model="ingredient.metricId">
                  <option :value="null">Piece</option>

                  <option v-for="metric of getMetrics" :key="metric.id" :value="metric.id">
                    {{ metric.metric }}
                  </option>
                </select>

                <button @click="removeIngredient(ingredientIndex)">X</button>
              </template>
            </div>

            <Button
              label="Add ingredient"
              class="add-step"
              kind="secondary"
              style="margin-top: 0.3rem"
              @click="addIngredient"
            />
          </div>

          <div class="steps">
            <h6>Steps</h6>

            <div
              v-for="(step, stepIndex) of recipe.steps"
              :key="stepIndex"
              class="description"
              style="padding-bottom: 2rem"
            >
              <div style="display: flex">
                <p>Step: {{ stepIndex + 1 }}</p>
              </div>

              <textarea v-model="step.content" type="text" rows="5"></textarea>

              <div class="optional">
                <p>Optional</p>
                <input v-model="step.optional" type="checkbox" />

                <button @click="removeStep(stepIndex)">X</button>
              </div>
            </div>

            <Button kind="primary" label="+ Add step" class="add-step" @click="addStep" />
          </div>
        </div>
        <div class="middle__buttons">
          <router-link to="/" class="cancel">Cancel</router-link>

          <Button
            kind="primary"
            class="create"
            :label="`${getEditRecipeId !== null && getEditRecipeId !== undefined ? 'Save' : 'Create'} recipe`"
            @clicked="saveRecipe"
          />
        </div>
      </div>
    </div>
    <div class="right">
      <SearchBar />
    </div>
  </div>

  <!-- Hacky way to set meta title -->
  <Teleport to="head">
    <title>{{ metaTitle || 'Create Recipe | Bearnaisee' }}</title>
    <meta name="title" :content="metaTitle || 'Create Recipe | Bearnaisee'" />
    <meta name="description" :content="metaDescription" />

    <meta property="og:type" content="website" />
    <meta property="og:url" :content="`https://bearnais.ee/create`" />
    <meta property="og:title" :content="metaTitle || 'Create Recipe | Bearnaisee'" />
    <meta property="og:description" :content="metaDescription" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="`https://bearnais.ee/create`" />
    <meta property="twitter:title" :content="metaTitle || 'Create Recipe | Bearnaisee'" />
    <meta property="twitter:description" :content="metaDescription" />
  </Teleport>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, computed } from 'vue';
import swal from 'sweetalert2';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import uploadImage from '@/helpers/uploadImage';

const SearchBar = defineAsyncComponent(() => import('@/components/SearchBar.vue'));
const Button = defineAsyncComponent(() => import('@/components/Button.vue'));
const Icon = defineAsyncComponent(() => import('@/components/Icon.vue'));
const Tag = defineAsyncComponent(() => import('@/components/Tag.vue'));
const SideNav = defineAsyncComponent(() => import('@/components/SideNav.vue'));

const router = useRouter();

const newTag = ref('');

const recipe = ref({
  title: '',
  description: '',
  coverImage: null as string | null,
  estimatedTime: 0,
  ingredients: [
    {
      amount: null as number | null,
      metricId: null as number | null,
      ingredient: '',
    },
  ],
  steps: [] as {
    content: string;
    optional: boolean;
  }[],
  tags: [] as string[],
});

const store = useStore();

const getMetrics = computed(() => store?.getters?.getMetrics);
const getUserInfo = computed(() => store?.getters?.getUserInfo);
const getEditRecipeId = computed(() => store?.getters?.getEditRecipeId);

const uploadImageBackground = computed(() => {
  if (recipe?.value?.coverImage) {
    return `background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
          url('${recipe?.value?.coverImage}');`;
  }

  return 'background-color: rgba(0, 0, 0, 5%);';
});

const metaTitle = `${getEditRecipeId.value ? 'Edit' : 'Create'} Recipe | Bearnaisee`;
const metaDescription = process?.env?.VUE_APP_META_DESC;

const fetchExistingRecipe = async (recipeId: number): Promise<void> => {
  const response = await axios
    .get(`${process.env.VUE_APP_API_URL}/recipes/${recipeId}`)
    .then((res) => res?.data)
    .catch((error) => {
      console.error('Error getting recipe', error);
    });

  if (response) {
    recipe.value = response;
  }
};

if (getEditRecipeId.value !== null && getEditRecipeId.value !== undefined) {
  fetchExistingRecipe(getEditRecipeId.value);
}

const addStep = () => {
  recipe.value.steps.push({
    content: '',
    optional: false,
  });
};

const addIngredient = () => {
  recipe.value.ingredients.push({
    amount: null,
    metricId: null,
    ingredient: '',
  });
};

const addTag = () => {
  const cleanedNewTag = newTag.value
    ?.trim()
    ?.toLowerCase()
    ?.replaceAll(/[^a-z0-9-]/gi, '');

  if (cleanedNewTag.length && recipe.value.tags.indexOf(cleanedNewTag) === -1) {
    recipe.value.tags.push(cleanedNewTag);
  }

  newTag.value = '';
};

if (!getMetrics?.value?.length) {
  store.dispatch('fetchMetrics');
}

const removeTag = (index: number) => {
  recipe.value.tags.splice(index, 1);
};

const removeStep = (index: number) => {
  recipe.value.steps.splice(index, 1);
};

const removeIngredient = (index: number) => {
  recipe.value.ingredients.splice(index, 1);
};

const uploadRecipeThumbnail = async (files: FileList) => {
  if (files?.length) {
    const result = await uploadImage(files[0]);

    if (result?.file_name?.length && result?.bucket_name?.length) {
      recipe.value.coverImage = `https://${result.bucket_name}.s3.eu-central-1.amazonaws.com/${result.file_name}`;
    } else {
      swal.fire({
        icon: 'error',
        title: 'Error uploading image',
        timer: 800,
        showConfirmButton: false,
      });
    }
  }
};

const saveRecipe = async () => {
  if (!recipe.value?.title?.length || !recipe.value?.steps?.length || !recipe.value?.ingredients?.length) {
    return;
  }

  if (getEditRecipeId.value !== null && getEditRecipeId.value !== undefined) {
    await axios
      .put(`${process.env.VUE_APP_API_URL}/recipe`, {
        ...recipe.value,
        userId: getUserInfo.value.id,
      })
      .then(async (result) => {
        await swal.fire({
          icon: 'success',
          title: 'Edited recipe successfully',
          showConfirmButton: false,
          timer: 1000,
        });

        store.dispatch('setEditRecipeId', null);

        router.push(`/${getUserInfo.value.username}/${result?.data?.recipe.slug}`);
      })
      .catch((error) => {
        swal.fire({
          icon: 'error',
          title: 'Something went wrong, please try again later',
          timer: 800,
          showConfirmButton: false,
        });

        console.error('Error editing recipe', error);
      });
  } else {
    await axios
      .post(`${process.env.VUE_APP_API_URL}/recipe`, {
        ...recipe.value,
        userId: getUserInfo.value.id,
      })
      .then(async (result) => {
        await swal.fire({
          icon: 'success',
          title: 'Created recipe successfully',
          showConfirmButton: false,
          timer: 1000,
        });

        router.push(`/${getUserInfo.value.username}/${result?.data.recipe.slug}`);
      })
      .catch((error) => {
        swal.fire({
          icon: 'error',
          title: 'Something went wrong, please try again later',
          timer: 800,
          showConfirmButton: false,
        });

        console.error('Error creating recipe', error);
      });
  }
};
</script>

<style lang="scss" scoped>
.flex {
  @media (max-width: 1023px) {
    .middle__buttons {
      display: flex;
      gap: 1.5rem;
      width: 100%;
      place-content: flex-end;

      .cancel {
        display: flex;
        padding: 0.2rem 1rem;
        border-radius: 4px;
        border: 1px solid var(--color-highlight);
        background-color: #fff;
        color: var(--color-highlight);
        place-items: center;

        &:hover {
          transition: 0.2s;
          background-color: var(--color-highlight);
          color: #fff;
        }
      }
    }
  }
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    .left {
      width: 20%;
    }

    .middle {
      width: 60%;
      margin-top: 2.5rem;

      .middle__buttons {
        display: flex;
        gap: 1.5rem;
        width: 100%;
        place-content: flex-end;

        .cancel {
          display: flex;
          padding: 0.2rem 1rem;
          border-radius: 4px;
          border: 1px solid var(--color-highlight);
          background-color: #fff;
          color: var(--color-highlight);
          place-items: center;

          &:hover {
            transition: 0.2s;
            background-color: var(--color-highlight);
            color: #fff;
          }
        }
      }
    }

    .right {
      width: 20%;

      @media (max-width: 1024px) {
        display: none;
      }
    }
  }
  .recipe-builder {
    display: grid;
    height: 100%;
    min-height: 100vh;
    gap: 1.25rem;
    margin: auto;

    @media (max-width: 1024px) {
      padding: 1rem;
    }

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

    .tags__list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: auto;
      margin-top: 1rem;

      p {
        cursor: pointer;
      }
    }

    h6 {
      color: rgba(0, 0, 0, 1);
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
      font-family: 'Poppins', sans-serif;
    }

    input {
      border-color: rgba(126, 126, 126, 0.3);
      border-radius: 4px;
      border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
      width: 100%;
      // height: 2rem;
      padding: 0.25rem;
    }
    select {
      border-radius: 4px;
      border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
      background-color: #ffffff;
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
      border: 4px solid var(--color-highlight);
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #ffffff;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -7px;
    }

    input[type='range']:focus::-webkit-slider-runnable-track {
      background: var(--color-highlight);
    }

    input[type='range']::-moz-range-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      box-shadow: 0px 0px 0px #000000;
      background: var(--color-highlight);
      border-radius: 1px;
      border: 0px solid #000000;
    }

    input[type='range']::-moz-range-thumb {
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid var(--color-highlight);
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: var(--color-highlight);
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
      background: var(--color-highlight);
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
    }
    input[type='range']::-ms-fill-upper {
      background: var(--color-highlight);
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
    }
    input[type='range']::-ms-thumb {
      margin-top: 1px;
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid var(--color-highlight);
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: var(--color-highlight);
      cursor: pointer;
    }
    input[type='range']:focus::-ms-fill-lower {
      background: var(--color-highlight);
    }
    input[type='range']:focus::-ms-fill-upper {
      background: var(--color-highlight);
    }

    // Add ingredients
    .ingredients {
      display: grid;
      grid: auto-flow / 0fr 0.6fr 0fr 0fr;
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

      .optional {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      input[type='checkbox'] {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
      }

      input[type='checkbox']:checked:before {
        background-color: rgba($color: var(--color-highlight), $alpha: 0.3);
        color: #ffffff;
      }
    }
  }
}
</style>
