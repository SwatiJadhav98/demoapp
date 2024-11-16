import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    personId: "",
    name: "",
    email: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    hobbies: [],
  });

  const [errors, setErrors] = useState({});
  const [dialog, setDialog] = useState("");

  // States and Cities Data
  const statesAndCities = {
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  };

  // Validation Logic
  const validate = (name, value) => {
    switch (name) {
      case "personId":
        return /^PID\d{3}$/.test(value)
          ? ""
          : "Person ID must start with 'PID' followed by 3 digits.";
      case "name":
        return value ? "" : "Name is required.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format.";
      case "dob":
        return value ? "" : "Date of birth is required.";
      case "state":
        return value ? "" : "State is required.";
      case "city":
        return value ? "" : "City is required.";
      default:
        return "";
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // Handle Hobbies Changes
  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    const updatedHobbies = checked
      ? [...formData.hobbies, value]
      : formData.hobbies.filter((hobby) => hobby !== value);
    setFormData({ ...formData, hobbies: updatedHobbies });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validate(key, formData[key]);
    });

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    // Calculate Age
    const birthDate = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setDialog(
      age > 18 ? "You are eligible to vote!" : "You are not eligible to vote."
    );
  };

  return (
    <div className="SignupForm">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Person ID Field */}
        <table className="table" align="center">
          <tr>
            <td>
              <label>Person ID:</label>
            </td>
            <td>
              <input
                type="text"
                name="personId"
                value={formData.personId}
                onChange={handleChange}
                style={{
                  borderColor: errors.personId
                    ? "red"
                    : formData.personId
                    ? "green"
                    : "",
                }}
              />
            </td>
            <td>
              <span style={{ color: errors.personId ? "red" : "green" }}>
                {errors.personId || (formData.personId && "Looks good!")}
              </span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  borderColor: errors.name
                    ? "red"
                    : formData.name
                    ? "green"
                    : "",
                }}
              />
            </td>
            <td>
              {" "}
              <span style={{ color: errors.name ? "red" : "green" }}>
                {errors.name || (formData.name && "Looks good!")}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label>Email:</label>
            </td>
            <td>
              {" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  borderColor: errors.email
                    ? "red"
                    : formData.email
                    ? "green"
                    : "",
                }}
              />
            </td>
            <td>
              {" "}
              <span style={{ color: errors.email ? "red" : "green" }}>
                {errors.email || (formData.email && "Looks good!")}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label>Date of Birth:</label>
            </td>
            <td>
              {" "}
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{
                  borderColor: errors.dob ? "red" : formData.dob ? "green" : "",
                }}
              />
            </td>
            <td>
              <span style={{ color: errors.dob ? "red" : "green" }}>
                {errors.dob || (formData.dob && "Valid date of birth!")}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label>Gender:</label>
            </td>
            <td>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={formData.gender === "Male"}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={formData.gender === "Female"}
              />{" "}
              Female
            </td>
          </tr>
          <tr>
            <td>
              <label>State:</label>
            </td>
            <td>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={{
                  borderColor: errors.state
                    ? "red"
                    : formData.state
                    ? "green"
                    : "",
                }}
              >
                {" "}
                <option value="">Select State</option>
                {Object.keys(statesAndCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <span style={{ color: errors.state ? "red" : "green" }}>
                {errors.state || (formData.state && "Looks good!")}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label>City:</label>
            </td>
            <td>
              {" "}
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.state}
                style={{
                  borderColor: errors.city
                    ? "red"
                    : formData.city
                    ? "green"
                    : "",
                }}
              >
                <option value="">Select City</option>
                {statesAndCities[formData.state]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </td>
            <td>
              {" "}
              <span style={{ color: errors.city ? "red" : "green" }}>
                {errors.city || (formData.city && "Looks good!")}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label>Hobbies:</label>
            </td>
            <td>
              <input
                type="checkbox"
                name="hobbies"
                value="Reading"
                onChange={handleHobbyChange}
              />{" "}
              Reading
              <input
                type="checkbox"
                name="hobbies"
                value="Traveling"
                onChange={handleHobbyChange}
              />{" "}
              Traveling
              <input
                type="checkbox"
                name="hobbies"
                value="Gaming"
                onChange={handleHobbyChange}
              />{" "}
              Gaming
            </td>
          </tr>
          <tr><td colSpan="3" align="center"><button type="submit">Submit</button></td></tr>
        </table>
      </form>
      {/* Dialog Box for Voting Eligibility */}
      {dialog && (
        <div>
          <h3>{dialog}</h3>
        </div>
      )}
    </div>
  );
};

export default SignUp;
