const regexHealthScore = /^0*(?:[1-9][0-9]?|100)$/;

function validate(form) {
    let errors = {
      title: "",
      summary: "",
      healthScore: "",
      steps: "",
      count: 1
    };

    
    if (form.title.length < 3 || form.title.length > 70) errors.title = 'El nombre de la receta debe tener entre 3 y 70 caracteres';
    if (form.summary.length < 3 || form.summary.length > 200) errors.summary = 'El resumen debe tener entre 3 y 200 caracteres';
    if(!regexHealthScore.test(form.healthScore)) errors.healthScore = 'Ingresa un numero entre 0 y 100';
    if (form.steps.length < 3 || form.steps.length > 200) errors.steps = 'Las instrucciones deben tener entre 3 y 200 caracteres';
    
    if (!errors.title && !errors.summary && !errors.healthScore && !errors.steps) errors.count = 0;
    
    return errors;
  }
  
  export default validate;
  