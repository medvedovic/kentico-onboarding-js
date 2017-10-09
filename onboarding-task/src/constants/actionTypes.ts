export namespace LocalItemActions {
  export const TOGGLE_BEING_EDITED = 'TOGGLE_BEING_EDITED';
  export const CREATE_ITEM = 'CREATE_ITEM';
  export const UPDATE_ITEM = 'UPDATE_ITEM';
  export const DELETE_ITEM = 'DELETE_ITEM';
}

export namespace FetchData {
  export const IS_LOADING = 'FETCH_IS_LOADING';
  export const HAS_FAILED = 'FETCH_HAS_FAILED';
  export const HAS_SUCCEEDED = 'FETCH_HAS_SUCCEEDED';
}

export namespace ItemActions {
  export const POST_ITEM_TO_SERVER = 'POST_ITEM_TO_SERVER';
  export const DELETE_ITEM_TO_SERVER = 'DELETE_ITEM_TO_SERVER';
  export const PUT_ITEM_TO_SERVER = 'PUT_ITEM_TO_SERVER';
}

export namespace HttpAction {
  export const POST = 'POST';
  export const DELETE = 'DELETE';
  export const PUT = 'PUT';
}

export enum EHttpActionStatus {
  success, error
}
