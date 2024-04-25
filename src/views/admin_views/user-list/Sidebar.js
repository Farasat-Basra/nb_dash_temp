// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Spinner } from "reactstrap";

// ** Store & Actions
import { addUser } from "../store";
import { createUser, getAllUsers } from "../../../redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "../../../utility/instances";
import axiosInstance from "../../../utility/axiosInstance";
import { useMutation, useQueryClient } from "react-query";
import { endpoint } from "./useFetchUsers";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  // role: "",
  country: null,
  state: null,
  city: null,
  // dob: "",
};

const countryOptions = [
  { label: "Australia", value: "Australia" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Belarus", value: "Belarus" },
  { label: "Brazil", value: "Brazil" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Japan", value: "Japan" },
  { label: "Korea", value: "Korea" },
  { label: "Mexico", value: "Mexico" },
  { label: "Philippines", value: "Philippines" },
  { label: "Russia", value: "Russia" },
  { label: "South", value: "South" },
  { label: "Thailand", value: "Thailand" },
  { label: "Turkey", value: "Turkey" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
];

const SidebarNewUsers = ({ open, setOpen, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");

  // ** Store Vars
  const dispatch = useAppDispatch();

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const queryClient = useQueryClient();
  const postTodo = async (data) => {
    const newData = {
      ...data,
      firstName: data?.firstName || null,  
      lastName: data?.lastName || null,
      email: data?.email || null,
      phoneNumber: data?.phoneNumber || null,
      status: "active" || null,
      country: data?.country.value || null,
      city: data?.city.value || null,
      state: data?.state.value || null,
    };
    try {
      const response = await axiosInstance.post("/admin/create/user", newData);
      setOpen(false);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: endpoint });
      // toast.success("User created successfully");
    },
  });


  // ** Function to handle form submit
  const onSubmit = (data) => {
    mutate(data);
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("subscriber");
    setPlan("basic");
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title=""
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <h3 className="py-2" color="muted">
        {" "}
        Add a new user
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {console.log("fromError", errors)}
        <Toaster title={errors} />
        <div className="mb-1">
          <Label className="form-label" for="firstName">
            First Name<span className="text-danger">*</span>
          </Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                id="firstName"
                placeholder="John Doe"
                invalid={errors.firstName && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="lastName">
            Last Name <span className="text-danger">*</span>
          </Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                id="lastName"
                placeholder="johnDoe99"
                invalid={errors.lastName && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email <span className="text-danger">*</span>
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="userEmail"
                placeholder="john.doe@example.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color="muted">
            You can use letters, numbers & periods
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="phoneNumber">
            phoneNumber <span className="text-danger">*</span>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="phoneNumber"
                placeholder="(397) 294-5153"
                invalid={errors.phoneNumber && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="country">
            Country <span className="text-danger">*</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.country === null,
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="state">
            State <span className="text-danger">*</span>
          </Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              // <Input id='state' placeholder='Australia' invalid={errors.state && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.state === null,
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="city">
            City <span className="text-danger">*</span>
          </Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              // <Input id='city' placeholder='Australia' invalid={errors.city && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.city === null,
                })}
                {...field}
              />
            )}
          />
        </div>

        <Button type="submit" className="me-1" color="primary">
       {isLoading ? <Spinner size="sm" color="light" /> : "Submit"}
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
