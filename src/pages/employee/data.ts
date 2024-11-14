// constants/mock-api.ts
export const fakeUsers = {
  getUsers: async (filters: {
    page: number;
    limit: number;
    search?: string;
    genders?: string;
  }) => {
    // Simulating a delay as if we were fetching data from an API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example of mock data based on filters
    const employees = Array.from({ length: filters.limit }, (_, index) => ({
      id: index + 1,
      first_name: `FirstName${index + 1}`,
      last_name: `LastName${index + 1}`,
      email: `employee${index + 1}@example.com`,
      phone: `+1 555-555-${index + 1}`,
      gender: index % 2 === 0 ? "Male" : "Female",
      date_of_birth: `1990-01-01`,
      street: `Street ${index + 1}`,
      city: `City ${index + 1}`,
      state: `State ${index + 1}`,
      country: `Country ${index + 1}`,
      zipcode: `1000${index + 1}`,
      job: `Job ${index + 1}`,
      profile_picture: `https://randomuser.me/api/portraits/men/${
        index + 1
      }.jpg`,
    }));

    return {
      total_users: 50, // Mock total number of employees
      users: employees, // Return the mock employee data
    };
  },
};
