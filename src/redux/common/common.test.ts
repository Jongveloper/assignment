import reducer, {
  setLoading,
  cleanDialog,
  commonInitailState,
  showAlert,
  showError,
} from './common';

describe('commonSlice', () => {
  context('setLoading', () => {
    it('loading 상태가 변경됩니다.', () => {
      const state = reducer(
        commonInitailState,
        setLoading(true),
      );

      expect(state.showLoading).toBe(true);
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
