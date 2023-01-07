import moment from 'moment';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { useModal } from '../../../hooks';
import { useTheme } from '../../../theme';
import { UiKeys } from '../../../ui';
import { formatDate } from '../../../utils';

import { Box } from '../../Box';
import { Icon } from '../../Icon';
import { BottomModal } from '../../Modal';
import { Text } from '../../Text';

type Props = UiKeys & {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export const DateInput: React.FC<Props> = ({
  placeholder,
  value,
  onChange: handleChange,
  ...props
}) => {
  const { theme } = useTheme();
  const { isModalOpen, openModal, closeModal } = useModal();

  const from = moment();
  const to = moment();
  to.add(1, 'month');

  return (
    <>
      <TouchableOpacity onPress={openModal} style={{ flexGrow: 1 }}>
        <Box
          flex
          borderRadius={1}
          overflow="hidden"
          bgColor="disabled"
          p={2}
          hcenter
          row
          {...props}
        >
          <Text type={value ? 'primary' : 'secondary'} flexGrow={1}>
            {value ? formatDate(value) : placeholder}
          </Text>
          <Icon name="calendar" color="primary" />
        </Box>
      </TouchableOpacity>
      <BottomModal isOpen={isModalOpen} onClose={closeModal}>
        <Calendar
          initialDate={value}
          minDate={from.format('YYYY-MM-DD')}
          maxDate={to.format('YYYY-MM-DD')}
          hideExtraDays={true}
          renderArrow={(dir) => (
            <Icon name={`chevron-${dir}`} color="primary" />
          )}
          firstDay={1}
          onDayPress={(date) => {
            handleChange(date.dateString);
            closeModal();
          }}
          markedDates={{
            [value]: { selected: true },
          }}
          theme={{
            selectedDayBackgroundColor: theme.palette.primary.main,
            calendarBackground: theme.palette.background.main,
            dayTextColor: theme.palette.text.primary,
            textDisabledColor: theme.palette.text.secondary,
            todayTextColor: theme.palette.primary.main,
            textSectionTitleColor: theme.palette.text.primary,
            monthTextColor: theme.palette.text.primary,
          }}
        />
      </BottomModal>
    </>
  );
};
