import { Box, CardMedia, MenuItem, TextField, Typography, Select as MuiSelect, InputLabel } from "@mui/material";
import { Button } from "components/Atoms/Button";
import { useYupValidationResolver } from "hooks/useYupValidationResolver";
import { forwardRef, useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { theme } from "utils/theme";

export const Form = ({ onSubmit, schema, children, ...options }) => {
  const resolver = useYupValidationResolver(schema);
  const methods = useForm({ resolver, ...options });
  const handleSubmitWithReset = async (data) => {
    await methods.handleSubmit(onSubmit)(data);
    methods.resetField("query")
  };
  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        component="form"
        onSubmit={methods.handleSubmit(handleSubmitWithReset)}
      >
        {children}
      </Box>
    </FormProvider>
  );
};
export const Input = ({
  name,
  label,
  className,
  style,
  inputStyle,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "0 0 10px 0",
      }}
      componenet="div"
      className={className}
      style={style}
    >
      <TextField
        label={label ? label : name}
        style={{ ...inputStyle }}
        {...register(name)}
        {...props}
        sx={{ fieldset: { borderRadius: "12px" } }}
      />

      {errors[name] && (
        <span
          style={{
            color: theme.palette.error.main,
            marginBottom: "10px",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
          role="alert"
        >
          {errors[name].message}
        </span>
      )}
    </Box>
  );
};


export const Select = ({
  name,
  label,
  className,
  inputStyle,
  selectOptions,
  config,
  style,
  ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const currentSelectOption = useWatch({ name });
  return (
    <Box
      sx={{
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // flexDirection: "column",
        // margin: "0 0 10px 0",
      }}
      componenet="div"
      className={className}
      style={style}
    >
      <TextField
        select
        label={label ? label : name}
        style={{ width: "100%", marginLeft: "5px", marginRight: "5px", ...inputStyle }}
        value={currentSelectOption}
        {...register(name)}
        {...props}
        sx={{ fieldset: { borderRadius: "12px" } }}
      >
        {selectOptions.map((selectOption, index) => (
          <Option key={index} value={selectOption.value}>
            {selectOption.option}
          </Option>
        ))}
      </TextField>
      {errors[name] && (
        <span
          style={{
            color: theme.palette.error.main,
            marginBottom: "10px",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
          role="alert"
        >
          {errors[name].message}
        </span>
      )}
    </Box>

  )
}
export const File = ({
  name,
  label,
  className,
  style,
  asButton = false,
  onChange,
  ...props
}) => {
  const file = useWatch({ name });
  const [img, setImg] = useState(null);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  useEffect(() => {
    if (file && file.length && typeof file === 'object') {
      onChange(file, setValue);
      const img = URL.createObjectURL(file[0]);
      setImg(img);
    }
    else if (file && file.length && typeof file === 'string') {
      const img = file;
      setImg(img);
    }
    return () => { };
  }, [file]);

  const handleClick = () => {
    setValue(name, null);
    setImg(null);
    // console.log("clickedDelte");
  };

  // console.log("IMAGE :- ", img);
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        position: "relative",
        width: "100% !important",
      }}
    >
      {img && (
        <>
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "185px", objectFit: "cover" }}
            image={img}
            alt="Preview"
          />
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              width: "25px",
              height: "25px",
              borderRadius: "50px",
              textAlign: "center",
              backgroundColor: theme.palette.error.main,
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => handleClick()}
          >
            <Typography fontWeight="bold" variant="body1">
              x
            </Typography>
          </div>
        </>
      )}
      {!img && (
        <img
          src="https://reprospecialty.com/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
          style={{ width: "100%", height: "185px", objectFit: "cover" }}
          alt="product"
        />
      )}
      <Button
        style={{ position: "absolute", bottom: "8px", right: "8px" }}
        variant="contained"
        component="label"
      >
        Pick Media
        <input
          hidden
          accept="image/*"
          type="file"
          {...register(name)}
          {...props}
        />
      </Button>
    </Box>
  );
};


export const Option = forwardRef(function Option(props, ref) {
  return <MenuItem ref={ref} {...props} />;
});
