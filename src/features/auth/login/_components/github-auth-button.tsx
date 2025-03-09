import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function GithubSignInButton() {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => {}}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continue with Github
    </Button>
  );
}
