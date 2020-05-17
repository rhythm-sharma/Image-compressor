<template>
  <div v-if="loadingState === `success`" class="mx-3 img-upload-container col">
    <div class="col p-0">
      <div class="row no-gutters">
        <p class="mb-0 file-name">{{ file && file.name ? file.name : "" }}</p>
        <p class="ml-2 mb-0 file-size">
          {{ file && file.size ? formatBytes(file.size) : "" }}
        </p>
        <i
          id="delete"
          @click="removeImage"
          class="cursor-pointer-force ml-auto far fa-trash-alt fa-xs align-self-md-center"
        ></i>
        <b-popover
          target="delete"
          placement="rightbottom"
          triggers="hover"
          content="Delete from list"
        ></b-popover>
      </div>
      <progress
        class="progress-bar-container"
        :value="progress"
        max="100"
      ></progress>
    </div>
    <div
      v-if="uploadingStatus === ''"
      class="d-flex carousel-control-next-icon"
    >
      <i
        @click="handleUploadImage"
        class="ml-0 cursor-pointer-force ml-auto fas fa-upload fa-xs align-self-md-center"
      ></i>
    </div>
    <div v-else-if="uploadingStatus === 'uploading'" class="row no-gutters">
      <p class="mb-0 p-0 text-left percent-done">
        {{ progress + "% done" }}
      </p>
      <div v-if="progressAction === 'resume'" class="ml-auto ">
        <i
          @click="resume"
          id="resume"
          class="upload-event-btn text-muted cursor-pointer-force fas fa-play fa-xs align-self-md-center"
        ></i>
        <b-popover
          target="resume"
          placement="rightbottom"
          triggers="hover"
          content="Resume"
        ></b-popover>
      </div>
      <div v-else-if="progressAction === 'pause'" class="ml-auto ">
        <i
          @click="pause"
          id="pause"
          class="upload-event-btn text-muted cursor-pointer-force fas fa-pause fa-xs align-self-md-center"
        ></i>
        <b-popover
          target="pause"
          placement="rightbottom"
          triggers="hover"
          content="Pause"
        ></b-popover>
      </div>
      <i
        @click="cancel"
        id="cancel"
        class="upload-event-btn text-muted cursor-pointer-force ml-auto fas fa-times fa-xs align-self-center"
      ></i>
      <b-popover
        target="cancel"
        placement="rightbottom"
        triggers="hover"
        content="Cancel"
    ></b-popover>
    </div>
    <div v-else-if="uploadingStatus === 'success'" class="row no-gutters">
      <p class="mb-0 p-0 text-left percent-done">
        Completed
      </p>
    </div>
    <div v-else-if="uploadingStatus === 'cancelled'" class="row no-gutters">
      <p class="mb-0 p-0 text-left text-danger cancelled">
        Cancelled
      </p>
    </div>
    <hr />
  </div>
  <div
    v-else
    class="d-flex justify-content-center align-items-center ml-4 file-upload-loading"
    :style="{ 'background-image': `url(${fileUploadLoading})` }"
  >
    <b-spinner label="Spinning"></b-spinner>
  </div>
</template>

<script>
import storage from "../plugins/Firebase";
import fileUploadLoading from "../assets/FileUploadLoading.jpg";
import {formatBytes} from "../utils/utilMethods.js"

export default {
  name: "ImageUploader",

  props: ["file", "loadingState", "index"],

  data() {
    return {
      fileUploadLoading,
      uploadingStatus: "",
      progress: 0,
      uploadTask: null,
      progressAction: "pause"
    };
  },

  mounted() {
    console.log("file inside component", this.file, this.loadingState);
  },

  methods: {
    handleUploadImage() {
      this.uploadingStatus = "uploading";
      this.uploadTask = storage
        .ref(`travographer/${this.file.name}`)
        .put(this.file);

      this.uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.progress = progress;
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("travographer")
            .child(this.file.name)
            .getDownloadURL()
            .then(url => {
              console.log("url: ", url);
              this.uploadingStatus = "success";
            });
        }
      );
    },
    resume() {
      this.progressAction = "pause";
      this.uploadTask.resume();
    },
    pause() {
      this.progressAction = "resume";
      this.uploadTask.pause();
    },
    cancel() {
      this.uploadTask.cancel();
      this.uploadingStatus = "cancelled";
      this.progress = 0;
    },
    removeImage() {
      this.$emit("remove", this.index);
    },
    formatBytes
  }
};
</script>

<style scoped>

.file-name {
  font-family: "Open sans", sans-serif;
  color: #4a4949;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
}

.file-size {
  font-family: "Open sans", sans-serif;
  color: #777777;
  font-size: 14px;
}

.percent-done {
  font-family: "Open sans", sans-serif;
  color: #777777;
  font-size: 14px;
}

.cancelled {
  font-family: "Open sans", sans-serif;
  font-size: 14px;
}

.progress-bar-container {
  width: 100%;
}

.cursor-pointer-force {
  cursor: pointer !important;
}

.file-upload-loading {
  /* margin-left: 0px !important;
    margin-right: 0px !important; */
  /* filter: blur(2px);   */
  width: 290px;
  height: 100px;
}

.upload-event-btn:active {
  color: black;
}

@media screen and (max-width: 786px) {
    .img-upload-container {
        margin: 0 !important;
    }

    .file-upload-loading {
       margin: 0 !important;
    }
}



</style>
