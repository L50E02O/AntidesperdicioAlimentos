export interface DashboardCard {
  title: string;
  subtitle: string;
  buttonText: string;
  iconClass?: string;
  action?: () => void;
}
