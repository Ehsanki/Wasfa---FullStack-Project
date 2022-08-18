<template>
  <div class="container">
  <div>
    <h1 class="title">Private Recipes </h1>
    <b-button v-b-modal.modal-prevent-closing>Add Private Recipe</b-button>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Your Recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
            <input name ="recipe-image" type="file" @change="onFileSelected" style="margin-left: 30%;"  required/>

        </b-row>
        <!--Recipe's Name-->
        <b-row>
          <b-col >Name</b-col>
          <b-col>
            <b-form-input
            ref ="title"
            v-model="title"
            :state="titleState"
            minlength=3
            placeholder=" Enter Recipe Name"
            required
          >
          </b-form-input>
          </b-col>
        </b-row>

        <!--minutes-->
        <b-row class="">
            <b-col>Ready In (Minutes)</b-col>
            <b-col>
                <b-form-input type="number"  ref = "minutes"  v-model="minutes" :state="minuteState" placeholder="Example: 45" required></b-form-input>
            </b-col>
        </b-row>

        <!--vegan-->
         <b-row class="">
            <b-col>Vegan</b-col>
            <b-col>
                <input type="checkbox" v-model="vegan">
            </b-col>
        </b-row>

        <!--vegeterian-->
        <b-row class="">
          <b-col>Vegetarian</b-col>
          <b-col>
            <input type="checkbox" v-model="vegetarian">
          </b-col>
        </b-row>

        <!--gluten-->
        <b-row class="">
          <b-col>Free Gluten</b-col>
          <b-col>
            <input type="checkbox"  id="" v-model="gluten">
          </b-col>
        </b-row>
        
        <!--Ingrediants-->
       <div class="form-group">
        <label class="text-gray-600 font-semibold text-lg">Ingrediants</label>
        <div class="input wrapper flex items-center" >
            <!-- Ingrediant Name Input-->
        <div
          style="display:flex; margin: 10px;"
          v-for="(input, index) in ingrediants"
          :key="`${index}`"
        >
         <b-form-input 
               v-model="input.ingrediant"
               type="text" 
               ref = "ingrediants"
               :state="null"
               class="h-10 rounded-lg outline-none p-2" 
               placeholder=" Example: salt and pepper, to taste "
               required     
          />
          
          <!--          Add Svg Icon-->
          <svg

            @click="addField(ingrediants)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>

          <!--          Remove Svg Icon-->
          <svg
            v-show="ingrediants.length > 1"
            @click="removeField(index, ingrediants)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
          </div>
        </div>
       </div>
       <!--upload photo button-->
       <!--<input type="file" @change="onFileSelected" :state="true"/>-->
        
        <!--Instructions--> 
        <div class="form-group">
        <label class="text-gray-600 font-semibold text-lg">Instructions</label>
        <div class="input wrapper flex items-center">
            <!-- Instructions Name Input-->
        <div
          style="display:flex; margin: 10px;"
          v-for="(input, index) in instructions"
          :key="`-${index}`"
          class="input wrapper flex items-center"
        >
         <b-form-input v-model="input.instruction"
               type="text" 
               ref = "instructions"
               class="instructions" 
               placeholder=" Example: Put the salt and paper in a food ... " 
               :state = "null"
               required    
          />
       <!--          Add Svg Icon-->
          <svg

            @click="addField(instructions)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>

          <!--          Remove Svg Icon-->
          <svg
            v-show="instructions.length > 1"
            @click="removeField(index, instructions)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
          </div>
        </div>
        </div>

      </form>
    </b-modal>
  </div>
    <RecipePreviewList v-if="renderComponent" title="Private Recipes"/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { BButton, BModal, VBModal } from "bootstrap-vue";
export default {
    data() {
      return {
        selectedfile:null,
        titleState: null,
        minuteState:null,
        image:'',
        title:'',
        minutes:'',
        vegan: false,
        vegetarian: false,
        gluten: false,
        ingrediants:[{ingrediant:""}],
        photos:[],
        instructions:[{instruction:""}],
        renderComponent:true
      }
    },
    directives: { 
            'b-modal': VBModal 
        },
    components: {
        RecipePreviewList,
        BButton,
        BModal, 
    },
    methods: {
      async forceRerender() {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
        
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.titleState = this.$refs['title'].checkValidity()
        this.minuteState = this.$refs['minutes'].checkValidity()
        return valid
      },
      resetModal() {
        this.titleState = null,
        this.minuteState = null,
        this.selectedfile = null,
        this.image='',
        this.title='',
        this.minutes='',
        this.vegan= false,
        this.vegetarian= false,
        this.gluten= false,
        this.ingrediants=[{ingrediant:""}],
        this.photos=[],
        this.instructions=[{instruction:""}]
      },
      async handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        
        // Trigger submit handler
        await this.handleSubmit()

        //render
        await this.forceRerender()

      },
      async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        //submittion
        await this.submit()
        // Hide the modal manually
        this.$bvModal.hide('modal-prevent-closing')
        
                
      },
      addField(fieldType) {
      fieldType.push({ });
      },
      removeField(index, fieldType) {
      fieldType.splice(index, 1);
      },
      onFileSelected(event){
        this.selectedfile = event.target.files[0]
      },
      async submit(){
        const fd = new FormData();
        fd.append('recipe-image',this.selectedfile)
        fd.append('title',this.title)
        fd.append('minutes',this.minutes)
        fd.append('vegan',this.vegan)
        fd.append('vegetarian',this.vegetarian)
        fd.append('gluten',this.gluten)
        fd.append('ingrediants',JSON.stringify(this.ingrediants))
        fd.append('instructions',JSON.stringify(this.instructions))
       
        try {
        const response = await this.axios.post(
          "/users/privates",
          fd,
          { headers: { "Content-Type": "multipart/form-data"}}
          
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
      }
    }
};
</script>
<style lang="scss" scoped>

.col{
  text-align: center;
}
.row {
      margin: 15px;
}
b-form-input{
   margin: 15px;
}
label{
  text-align: center;
  display: block;
}
.d-black{
    width: 60%;
    float: left;
}
.kind{
    float: left;
    width: 50%;
    text-align: center;
    
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
