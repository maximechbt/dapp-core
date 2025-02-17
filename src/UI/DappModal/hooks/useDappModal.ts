import { useCallback, useEffect } from 'react';
import { useIsDappModalVisible } from 'hooks';
import { useDispatch, useSelector } from 'reduxStore/DappProviderContext';
import { dappModalConfigSelector } from 'reduxStore/selectors/dappModalsSelectors';
import {
  setDappModalConfig,
  setDappModalVisibility
} from 'reduxStore/slices/dappModalsSlice';
import {
  DappModalConfig,
  DappModalInteractionConfig
} from '../dappModal.types';

export interface UseDappModalProps {
  config?: DappModalInteractionConfig;
  modalConfig?: DappModalConfig;
}

export const useDappModal = (props?: UseDappModalProps) => {
  const dispatch = useDispatch();
  const visible = useIsDappModalVisible();
  const modalConfig = useSelector(dappModalConfigSelector);

  const handleShowModal = () => {
    dispatch(setDappModalVisibility(true));
  };

  const handleHideModal = () => {
    dispatch(setDappModalVisibility(false));
  };

  const setModalConfig = useCallback((config: DappModalConfig) => {
    dispatch(setDappModalConfig(config));
  }, []);

  useEffect(() => {
    if (props?.modalConfig) {
      setModalConfig(props?.modalConfig);
    }
  }, [props?.modalConfig]);

  useEffect(() => {
    if (props?.config?.openOnMount) {
      handleShowModal();
    }

    return () => {
      handleHideModal();
    };
  }, []);

  useEffect(() => {
    if (typeof props?.config?.visible !== 'boolean') {
      return;
    }

    if (props.config.visible) {
      handleShowModal();
    } else {
      handleHideModal();
    }
  }, [props?.config?.visible]);

  return {
    handleShowModal,
    handleHideModal,
    setModalConfig,
    visible,
    config: modalConfig
  };
};
