import { Button } from "./ui/button";
import { logout } from "@/actions/authActions";

export const LogoutButton = () => {
  return (
    <form>
      <Button
        variant={"destructive"}
        formAction={async () => {
          "use server";
          await logout();
        }}
      >
        Log out
      </Button>
    </form>
  );
};
