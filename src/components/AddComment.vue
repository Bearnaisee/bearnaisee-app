<template>
  <div class="form">
        <form>
            <div class="form__group">
                    <label>Skriv en kommentar</label>
                    <textarea v-model="newComment" required cols="30" rows="10" placeholder="Skriv her..."></textarea>
                    <button>Send</button>
            </div>
        </form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            newComment: '',
        };
    },
}
</script>

<style>

</style>