<template>
  <div class="upload-container">
    <b-modal id="settings" title="Configure image settings">
      <div class="card-body bg-white">
        <fieldset class="form-group">
          <div class="form-check form-check-inline">
            <input
              type="checkbox"
              name="strict"
              class="form-check-input"
              id="inputStrict"
              v-model="options.strict"
            />
            <label class="form-check-label" for="inputStrict">strict</label>
          </div>
        </fieldset>
        <fieldset class="form-group">
          <div class="form-check form-check-inline">
            <input
              type="checkbox"
              name="checkOrientation"
              class="form-check-input"
              id="inputCheckOrientation"
              v-model="options.checkOrientation"
            />
            <label class="form-check-label" for="inputCheckOrientation"
              >checkOrientation</label
            >
          </div>
        </fieldset>
        <div class="form-group row">
          <label for="inputMaxWidth" class="col-sm-5 col-form-label"
            >maxWidth</label
          >
          <div class="col-sm-7">
            <input
              type="number"
              name="maxWidth"
              class="form-control"
              id="inputMaxWidth"
              placeholder="Infinity"
              v-model.number="options.maxWidth"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputMaxHeight" class="col-sm-5 col-form-label"
            >maxHeight</label
          >
          <div class="col-sm-7">
            <input
              type="number"
              name="maxHeight"
              class="form-control"
              id="inputMaxHeight"
              placeholder="Infinity"
              v-model.number="options.maxHeight"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputMinWidth" class="col-sm-5 col-form-label"
            >minWidth</label
          >
          <div class="col-sm-7">
            <input
              type="number"
              name="minWidth"
              class="form-control"
              id="inputMinWidth"
              placeholder="0"
              v-model.number="options.minWidth"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputMinHeight" class="col-sm-5 col-form-label"
            >minHeight</label
          >
          <div class="col-sm-7">
            <input
              type="number"
              name="minHeight"
              class="form-control"
              id="inputMinHeight"
              placeholder="0"
              v-model.number="options.minHeight"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputWidth" class="col-sm-5 col-form-label">width</label>
          <div class="col-sm-7">
            <input
              type="number"
              name="width"
              class="form-control"
              id="inputWidth"
              placeholder="undefined"
              v-model.number="options.width"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputHeight" class="col-sm-5 col-form-label"
            >height</label
          >
          <div class="col-sm-7">
            <input
              type="number"
              name="height"
              class="form-control"
              id="inputHeight"
              placeholder="undefined"
              v-model.number="options.height"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputQuality" class="col-sm-5 col-form-label"
            >quality</label
          >
          <div class="col-sm-7">
            <select
              class="form-control"
              name="quality"
              id="inputQuality"
              v-model.number="options.quality"
            >
              <option value="0">0</option>
              <option value="0.1">0.1</option>
              <option value="0.2">0.2</option>
              <option value="0.3">0.3</option>
              <option value="0.4">0.4</option>
              <option value="0.5">0.5</option>
              <option value="0.6">0.6</option>
              <option value="0.7">0.7</option>
              <option value="0.8">0.8</option>
              <option value="0.9">0.9</option>
              <option value="1">1</option>
              <option value="">NaN</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputMimeType" class="col-sm-5 col-form-label"
            >mimeType</label
          >
          <div class="col-sm-7">
            <input
              type="text"
              name="mimeType"
              class="form-control"
              id="inputMimeType"
              placeholder="auto"
              v-model.number="options.mimeType"
            />
          </div>
        </div>
        <div class="form-group row mb-0">
          <label for="inputConvertSize" class="col-sm-5 col-form-label"
            >convertSize</label
          >
          <div class="col-sm-7">
            <input
              type="number"
              name="convertSize"
              class="form-control"
              id="inputConvertSize"
              placeholder="5000000"
              v-model.number="options.convertSize"
            />
          </div>
        </div>
      </div>
    </b-modal>
    <b-card class="shadow-lg p-3 mt-5 mb-5 bg-white rounded mr-auto ml-auto responsive-card">
      <div class="row border-bottom">
        <h3 class="card-title ml-auto mr-auto">File Upload</h3>
        <i
          :id="`configure-image-settings`"
          v-b-modal.settings
          class="fas fa-cog text-muted mt-2 outline-none"
        ></i>
        <b-popover
          target="configure-image-settings"
          placement="rightbottom"
          triggers="hover"
          content="Configure image settings"
        ></b-popover>
        <!-- <b-button v-b-modal.modal-1>Settings</b-button> -->
      </div>
      <br />
      <div class="responsive-row-col mt-6">
        <section
          class="mb-3 dropzone-container"
          @change="change"
          @dragover="dragover"
          @drop="drop"
        >
          <input
            name="uploadedImage"
            type="file"
            class="sr-only"
            id="file"
            accept="image/*"
            ref="input"
          />
          <img
            class="drop-picture mt-5"
            :src="DropPicture"
            alt="Drag and drop"
          />
          <!-- <div class="my-5 mx-3">
              <h5>Drop your photo here to crop it</h5>
            </div> -->
          <div class="p-5 text-center">
            Drop image here or
            <label class="text-primary cursor-pointer-force"
              >browse...
              <input
                type="file"
                class="sr-only"
                id="file"
                accept="image/*"
                ref="input"
                multiple
            /></label>
          </div>
        </section>
        <h5 v-if="output.length > 0" class="card-title ml-auto mr-auto responsive-heading mb-4">Selected images to upload</h5>
        <div v-if="output.length === 0" class="align-items-center d-flex empty-illustration flex-column justify-content-center ml-auto mr-auto pr-4 m-0-responsive">
          <h4 class="card-title ml-auto mr-auto">No images slected yet!</h4>
          <img height="150px" width="160px" :src="EmptyIllustration" alt="">
        </div>
        <div v-else class="image-upload-container col">
          <div v-for="(file, index) in output.slice().reverse()" :key="index">
            <image-uploader
              :file="file.file"
              :loadingState="file.loadingState"
              :index="output.length - 1 - index"
              @remove="removeOutputImage"
            />
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import DropPicture from "../assets/DropPicture.png";
import EmptyIllustration from "../assets/EmptyIllustration.png"

import ImageUploader from "../components/ImageUploader.vue";
import Compressor from "../utils/compressor.js";


export default {
  data() {
    return {
      DropPicture: DropPicture,
      EmptyIllustration,
      options: {
        strict: true,
        checkOrientation: true,
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: undefined,
        height: undefined,
        quality: 0.8,
        mimeType: "",
        convertSize: 5000000,
        success: (result, index) => {
          console.log("Output: ", result);
          this.output.forEach(item => {
            console.log("this.output: ", this.output);
            if (item.key === result.name) {
              item.loadingState = "success";
              item.file = result;
            }
          });
        },
        error: (err) => {
          window.alert(err.message);
          this.output.forEach((item, index) => {
            if (item.loadingState === "loading") {
              this.output.splice(index, 1);
            }
          })
        }
      },
      // array of objects
      input: [],
      output: []
    };
  },

  components: {
    ImageUploader
  },

  methods: {
    compress(file) {
      if (!file) {
        return;
      }

      console.log("Input: ", file);

      this.input.push(file);

      new Compressor(file, this.options);
    },

    change(e) {
      Object.keys(e.target.files).forEach(key => {
        this.output.push({
          loadingState: "loading",
          file: null,
          key: e.target.files[key].name
        });
        this.compress(e.target.files[key]);
      });
    },

    dragover(e) {
      e.preventDefault();
    },

    drop(e) {
      e.preventDefault();
      Object.keys(e.dataTransfer.files).forEach(key => {
        this.output.push({
          loadingState: "loading",
          file: null,
          key: e.dataTransfer.files[key].name
        });
        this.compress(e.dataTransfer.files[key]);
      });
    },
    removeOutputImage(index) {
      console.log("removeOutputImage", index);
      console.log("this.output", this.output);
      this.output.splice(index, 1);
    }
  }
};
</script>

<style lang="css" scoped>
.dropzone-container {
  border: 4px dashed #eeeeee !important;
  border-radius: 10px !important;
  color: #333333 !important;
  text-align: center !important;
  background: #f9f9f9;
  max-height: 320px;
}

.drop-picture {
  width: 160px;
}

.cursor-pointer-force {
  cursor: pointer !important;
}

.image-upload-container {
  overflow-y: scroll;
  max-height: 320px;
}

.outline-none:focus {
  outline: none !important;
}

.empty-illustration {
  width: 300px;
  height: 300px;
}
/* 
.responsive-row-col {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
} */


.responsive-row-col {
  flex-direction: row !important;
  display: flex !important;
}

.responsive-card {
  width: 760px;
}


.responsive-heading {
  display: none;
}

@media screen and (max-width: 1024px) {
  .responsive-card {
      width: 740px;
  }
}

@media screen and (max-width: 786px) {

  .responsive-heading{
    display: block;
  }

  .responsive-row-col {
    display: block !important;
  }

  .responsive-card {
    width: 500px;
  }

}

@media screen and (max-width: 500px) {
  .responsive-card {
    max-width: 300px;
  }

}



@media screen and (max-width: 425px) {
  .responsive-card {
    max-width: 350px;
  }

  .empty-illustration {
    width: 250px;
    height: 300px;
  }
}

@media screen and (max-width: 320px) {
  .responsive-card {
    max-width: 300px;
  }
}




</style>
