<template>
    <div v-if="loadingState === 'error'" class="col">
        <div
            class="d-flex justify-content-center align-items-center rounded mt-3 blur-card"
            :style="{ 'background-image': `url(${BlurCard})` }"
        >
              <p class="m-4">
                There seems to have been an issue in fetching things!
            </p>
        </div>
    </div>
    <div v-else-if="loadingState === 'loading'" class="col">
        <div
            class="d-flex justify-content-center align-items-center rounded mt-3 blur-card"
            :style="{ 'background-image': `url(${BlurCard})` }"
        >
              <b-spinner label="Spinning"></b-spinner>
        </div>
    </div>
    <div v-else-if="loadingState === 'success'" class="col">
        <div class="card-body rounded mt-3 card-container" :style="{width:'18rem'}" >
            <div class="preview-container">
                <img class="rounded img-preview" alt="preview" variant="top" :src='url' />
            </div>
            <div class="attributes">
                <div>
                    <p class="m-0 card-top-heading">Name</p>
                    <p class="card-text"> <a class="text-ellipsis" :href="url" target="_blank">{{fileMetaData.name}} <i class="fas fa-external-link"></i></a></p>
                </div>
                <div>
                    <p class="m-0 card-top-heading">Size</p>
                    <p class="card-text">{{formatBytes(fileMetaData.size)}} bytes</p>
                </div>
                <div>
                    <p class="m-0 card-top-heading">Type</p>
                    <p class="card-text">{{fileMetaData.type}}</p>
                </div>
                <div>
                    <p class="m-0 card-top-heading">Uploaded at</p>
                    <p class="card-text">{{  Date(fileMetaData.created).split("GMT")[0]}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlurCard from "../assets/BlurCard.jpg"
import storage from "../plugins/Firebase";
import { formatBytes } from "../utils/utilMethods"

export default {
    props: ["name"],

    data() {
        return {
            BlurCard,
            fileMetaData: {},
            url: "",
            loadingState: ""
        }
    },

    mounted() {
        this.loadingState = "loading"
        const imgRef = storage.ref(`/travographer/${this.name}`)
        storage.ref(`/travographer/${this.name}`).getDownloadURL().then(url => {this.url = url} )
        imgRef.getMetadata().then((metadata) => {
            let tempFiles = {
                "name": metadata.name,
                "size": metadata.size,
                "type": metadata.contentType,
                'created': metadata.timeCreated
            }
            this.fileMetaData = tempFiles
            this.loadingState = "success"
        })
        .catch(function(error) {
            this.loadingState = "error"
            console.log(error)
        });
    },

    methods: {
        formatBytes
    }

}
</script>

<style>


.card-container {
  background-color: #fafafa;
  border: 1px solid #e63b3a !important;
}

.attributes {
    padding: 24px 0px 0;
}

.card-top-heading {
  color: #a5a5a5 !important;
  font-size: 13px !important;
}

.card-text {
  margin-bottom: 16px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  color: rgba(0,0,0,.87) !important;
  font-size: 13px !important;
}

.text-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 240px;
}

.preview-container {
    height: 140px;
    width: 252px;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 16px;
}

.img-preview {
    max-height: 140px;
    max-width: 252px;
}

.blur-card {
    background-color: #fafafa;
    height: 462px;
    width: 288px;
}

</style>