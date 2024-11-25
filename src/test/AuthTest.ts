import { useAuthStore } from "@/stores/AuthStore";
import { User, AuthFormData } from "@/app/lib/types";

describe("AuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isLogin: true,
      formData: {
        email: "",
        password: "",
      },
      error: null,
      isSubmitting: false,
    });
  });

  it("should set user", () => {
    const testUser: User = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "1234567",
    }; // Cambiado id a number
    useAuthStore.getState().setUser(testUser);
    expect(useAuthStore.getState().user).toEqual(testUser);
  });

  it("should toggle auth mode", () => {
    expect(useAuthStore.getState().isLogin).toBe(true);
    useAuthStore.getState().toggleAuthMode();
    expect(useAuthStore.getState().isLogin).toBe(false);
    expect(useAuthStore.getState().formData).toEqual({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  });

  it("should update form data", () => {
    useAuthStore.getState().updateFormData("email", "test@example.com");
    expect(useAuthStore.getState().formData.email).toBe("test@example.com");
  });

  it("should set error", () => {
    useAuthStore.getState().setError("Test error");
    expect(useAuthStore.getState().error).toBe("Test error");
  });

  it("should set isSubmitting", () => {
    useAuthStore.getState().setIsSubmitting(true);
    expect(useAuthStore.getState().isSubmitting).toBe(true);
  });

  it("should validate login form data", () => {
    useAuthStore.getState().updateFormData("email", "invalid-email");
    useAuthStore.getState().updateFormData("password", "123");
    const error = useAuthStore.getState().validateFormData();
    expect(error).not.toBeNull();
  });

  it("should validate registration form data", () => {
    useAuthStore.getState().toggleAuthMode();
    useAuthStore.getState().updateFormData("email", "valid@email.com");
    useAuthStore.getState().updateFormData("password", "validPassword123");
    useAuthStore.getState().updateFormData("name", "Test User");
    useAuthStore
      .getState()
      .updateFormData("confirmPassword", "validPassword123");
    const error = useAuthStore.getState().validateFormData();
    expect(error).toBeNull();
  });
});
