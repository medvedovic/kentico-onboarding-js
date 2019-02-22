export interface IAction {
  /** Type of action */
  type: string;
  /** Data passed with action */
  payload?: any;
}
