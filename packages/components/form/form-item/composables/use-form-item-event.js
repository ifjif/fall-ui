import AsyncValidator from "async-validator";
export function useFormItemEvent(props, tip, formKey) {
  let errorType = "";
  let initValue = null;
  const changeRules = {};
  const blurRules = {};
  const allRules = {};
  const observer = (triggeType) => {
    if (triggeType === "change") {
      validate(changeRules, "change");
    } else if (triggeType === "blur") {
      validate(blurRules, "blur");
    }
  };
  const initRules = () => {
    changeRules[props.prop] || (changeRules[props.prop] = []);
    blurRules[props.prop] || (blurRules[props.prop] = []);
    const rules = formKey?.rules.value?.[props.prop]
      ? formKey?.rules.value[props.prop]
      : [];
    rules.forEach((rule) => {
      if (rule.trigge === "change") {
        changeRules[props.prop].push(rule);
      } else if (rule.trigge === "blur") {
        blurRules[props.prop].push(rule);
      }
    });
    allRules[props.prop] = rules;
  };
  const getValue = () => {
    const value = formKey?.model.value?.[props.prop];
    return {
      [props.prop]: value,
    };
  };

  const validate = (rules, triggeType) => {
    return new Promise((resolve, reject) => {
      const value = getValue();
      const validator = new AsyncValidator(rules);
      validator.validate(value).then(() => {
        (errorType === "all" || errorType === triggeType) &&
          ((errorType = "") || (tip.value = ""));
        resolve();
      }).catch(({ errors, fields }) => {
        tip.value = errors[0].message;
        errorType = triggeType;
        reject(errors[0]);
      });
    });
  };

  const setInitValue = () => {
    initValue = formKey?.model.value?.[props.prop];
  };
  const restField = () => {
    if (formKey?.model.value) {
      formKey.model.value[props.prop] = initValue;
      errorType = "";
      tip.value = "";
    }
  };

  const setField = () => {
    if (!props.prop) return;
    const field = {
      validate: () => {
        //单个错误，全一定错误,则errorType change to 'all'
        return validate(allRules, "all");
      },
      restField,
    };
    formKey?.putFields(field);
  };

  return {
    observer,
    initRules,
    setField,
    setInitValue,
  };
}
