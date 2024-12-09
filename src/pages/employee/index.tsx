import { Heading } from "@/components/heading/heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import PageContainer from "@/layout/root-layout/page-container";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeUsers } from "./data";

// Defining types for the API response (or mock data) for users
interface UserResponse {
  users: Employee[];
  total_users: number;
}

// Define the type for searchParams (you might already have this defined in your routing or utils)
interface SearchParams {
  page: number;
  limit: number;
  search: string;
  gender: string;
}

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  // Assuming searchParams is coming from the URL or routing context
  const searchParams: SearchParams = {
    page: 1, // default to page 1
    limit: 10, // default to 10 items per page
    search: "", // default empty search
    gender: "", // default no gender filter
  };

  const page = searchParams.page || 1;
  const pageLimit = searchParams.limit || 10;
  const search = searchParams.search || "";
  const gender = searchParams.gender || "";

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender }),
  };

  // const { data: employee } = useReadEmployeesQuery({
  //   limit,
  //   page,
  //   populate,
  //   search,
  //   sortBy,
  //   sortType,
  // });

  useEffect(() => {
    // Mock API call to fetch user data (replace with actual API call)
    const fetchData = async () => {
      const data: UserResponse = await fakeUsers.getUsers(filters); // Replace with real API call
      setEmployees(data.users);
      setTotalUsers(data.total_users);
    };

    fetchData();
  }, [filters]);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            to="/dashboard/employee/new"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        {/* <EmployeeTable data={employees} totalData={totalUsers} /> */}
      </div>
    </PageContainer>
  );
}
