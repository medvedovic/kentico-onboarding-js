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

export namespace POST_ITEM_TO_SERVER {
  export const SUCCESS = 'POST_ITEM_TO_SERVER_SUCCESS';
  export const FAILURE = 'POST_ITEM_TO_SERVER_FAILURE'
}

export namespace PUT_ITEM_TO_SERVER {
  export const SUCCESS = 'PUT_ITEM_TO_SERVER_SUCCESS';
  export const FAILURE = 'PUT_ITEM_TO_SERVER_FAILURE';
}

export const DELETE_ITEM_TO_SERVER = 'DELETE_ITEM_TO_SERVER';

