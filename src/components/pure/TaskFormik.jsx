
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

//Models
import { LEVELS } from "../../models/levels.enums"




const TaskFormik = ({taskLength,add }) => {


  const initialValues = {
    name: "",
    description: "",
    completed: false,
    level:''
  };

  

  const taskSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Name too short")
      .max(12, "Name too long")
      .required('Name is required'),
    description: Yup.string()
      .min(8, "Description too short")
      .max(100, "Description too long")
      .required('Description is required'),
    level: Yup.string()
      .oneOf(
        [LEVELS.NORMAL, LEVELS.URGENT, LEVELS.BLOCKING],
        "You must selecte a level"
      )
      .required("Level is required"),
  });

  const submit = (values) => {
    alert('Task created')
  };


  return ( 
    <div style={{display:'flex', flexDirection:'column', width:'100vw', padding:'1rem'}}>
    <h1>Add task</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 1000));
        alert(JSON.stringify(values, null, 2));
      }}
      
    >
      {({ errors, isSubmitting, touched, values }) => (
        <Form style={{display:'flex', flexDirection:'column', justifyContent:'center', marginBottom:'1rem'}}>
          <label htmlFor="name" style={{margin:'10px', padding:'1rem'}}>Name</label>
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Your task"
          />
          {errors.name && touched.name && (
            <ErrorMessage name="name" component="div" />
          )}
          <label htmlFor="description">Description</label>
          <Field
            id="description"
            name="description"
            type="text"
            placeholder="Description"
          />
          {errors.description && touched.description && (
            <ErrorMessage name="description" component="div" />
          )}
          <label htmlFor="level">Level</label>
          <Field
            component='select'
            id="level"
            name='level' 
          >
          <option value={LEVELS.NORMAL}>Normal</option>
          <option value={LEVELS.URGENT}>Urgent</option>
          <option value={LEVELS.BLOCKING}>Blocking</option>
          </Field>
          {errors.level && touched.level && (
            <ErrorMessage name="level" component="div" />
          )}

          <button type="submit" className="btn btn-primary" style={{marginTop:'1rem'}}>
            {taskLength > 0 ? 'Add New Task' : 'Create your first task'}
          </button>
          {isSubmitting ? <p>SENDING YOUR TASK..</p> : null}
        </Form>
      )}
    </Formik>
  </div>
  );
};

export default TaskFormik;
