import reducer, {
  showLoading,
  cleanDialog,
  commonInitailState,
  showAlert,
  showError,
  dontShowLoading,
} from './common';

describe('commonSlice', () => {
  context('showLoading', () => {
    it('loading 상태가 변경됩니다.', () => {
      const state = reducer(
        commonInitailState,
        showLoading(),
      );

      expect(state.showLoading).toBe(true);
    });
  });

  context('dontShowLoading', () => {
    it('loading 상태가 변경됩니다.', () => {
      const state = reducer(
        {
          ...commonInitailState,
          showLoading: true,
        },

        dontShowLoading(),
      );

      expect(state.showLoading).toBe(false);
    });
  });

  context('showAlert', () => {
    const dialog = {
      message: 'test',
      title: 'test',
    };
    it('dialog 상태가 변경됩니다.', () => {
      const state = reducer(
        commonInitailState,
        showAlert(dialog),
      );

      expect(state.dialog).toEqual({ ...dialog, showDialog: true, status: 'ALERT' });
    });
  });

  context('showError', () => {
    const dialog = {
      message: 'test',
      title: 'test',
    };
    it('dialog 상태가 변경됩니다.', () => {
      const state = reducer(
        commonInitailState,
        showError(dialog),
      );

      expect(state.dialog).toEqual({ ...dialog, showDialog: true, status: 'ERROR' });
    });
  });

  context('cleanDialog', () => {
    it('dialog가 cleanUp됩니다.', () => {
      const state = reducer(
        {
          ...commonInitailState,
          dialog: {
            showDialog: true,
            status: 'ALERT',
            message: 'test',
            title: 'test',
          },
        },
        cleanDialog(),
      );

      expect(state.dialog).toEqual({
        showDialog: false,
        message: '',
        title: '',
      });
    });
  });
});
