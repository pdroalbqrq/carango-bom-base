import baseUrl from "../config/environment";

const DashboardService = {
  listar() {
    return fetch(`${baseUrl}/dashboard/`).then((r) => r.json());
  },
};

export default DashboardService;
