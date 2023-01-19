import reducer, {
  setLoading,
  setDialog,
  closeDialog,
  commonInitailState,
} from './common';

describe('commonSlice', () => {
  context('setLoading', () => {
    it('loading 상태가 변경됩니다.', () => {
      const state = reducer(
        commonInitailState,
        setLoading(true),
      );

      expect(state.isLoading).toBe(true);
    });
  });

  context('setDialog', () => {
    const dialog = {
      isOpen: true,
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

  context('closeDialog', () => {
    it('dialog가 cleanUp됩니다.', () => {
      const state = reducer(
        {
          ...commonInitailState,
          dialog: {
            isOpen: true,
            status: 'ALERT',
            message: 'test',
            title: 'test',
          },
        },
        closeDialog(),
      );

      expect(state.dialog).toEqual({
        isOpen: false,
        message: '',
        title: '',
        status: '',
      });
    });
  });
});
