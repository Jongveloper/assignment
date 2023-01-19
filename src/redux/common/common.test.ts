import reducer, {
  setLoading,
  setDialog,
  cleanDialog,
  commonInitailState,
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

  context('setDialog', () => {
    const dialog = {
      showDialog: true,
      status: 'ALERT',
      message: 'test',
      title: 'test',
    };
    it('dialog 상태가 변경됩니다.', () => {
      const state = reducer(
        commonInitailState,
        setDialog(dialog),
      );

      expect(state.dialog).toEqual(dialog);
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
