import router from "../controllers/surveyController.js"

const routes = (app)=>{
    app.use("/", router)
}

export default routes