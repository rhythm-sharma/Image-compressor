<template>
    <div class="pb-4">
        <div class="row">
            <nuxt-link to="/" class="cursor-pointer-force ml-auto">
                <h3 class="gallery-heading m-3 mr-5 ml-lg-4 cursor-pointer-force"><i class="fas fa-long-arrow-alt-left"></i>Back</h3>
            </nuxt-link>
        </div>
        <div v-if="loadingState === 'error'" class="w-100 full-height ">
             <p class="m-4 text-light">
                There seems to have been an issue in fetching things!
            </p>
        </div>
        <div v-else class="row ml-3 mr-3 full-height">
            <div v-for="(imgName, index) in imgStorageData" :key="index">
                <gallery-card :name="imgName"/>
            </div>
        </div>
    </div>
</template>

<script>
import storage from "../plugins/Firebase";
import galleryCard from "../components/galleryCard";

export default {
    data () {
        return {
            loadingState: "",
            imgStorageData: []
        }
    },

    components: {
        galleryCard
    },

    mounted() {
        // Created a reference of bucket  
        const listRef = storage.ref('/travographer');
        // Created a reference for list 
        listRef.listAll().then((res) => {
        res.items.forEach((itemRef) => {
            this.imgStorageData = [...this.imgStorageData, itemRef.name]
        });
        }).catch(function(error) {
            console.log("error", error)
            this.loadingState = "error"
        });
    }
}
</script>

<style>
.gallery-container{
    background-color: #f0f0f0 !important;
    padding: 20px !important;
}

.gallery-heading {
  position: relative;
  margin-bottom: 30px;
  color: #e63b3a !important;
  text-transform: uppercase;
  letter-spacing: 2px;
  /* font-weight: 600;
  font-family:'Helvetica Neue', Arial, sans-serif; */
}

.name-heading {
  position: relative;
  font-size: 20px;
  line-height: 1.3;
}

.full-height {
    height: 1080px !important;
}

.cursor-pointer-force {
  cursor: pointer !important;
}

.cursor-pointer-force:hover {
  text-decoration: none !important;
}

</style>