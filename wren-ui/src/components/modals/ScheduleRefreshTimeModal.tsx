import { Form, Input, Modal, Select, Row, Col, TimePicker } from 'antd';
import moment from 'moment';
import { capitalize } from 'lodash';
import { ModalAction } from '@/hooks/useModalAction';

type Props = ModalAction<{
  responseId: number;
  retrievedTables: string[];
  sqlGenerationReasoning: string;
}> & {
  loading?: boolean;
};

export interface Schedule {
  frequency: string;
  day: string;
  hour: number;
  minute: number;
  cron?: string;
}

const timeFormat = 'HH:mm';

const FREQUENCY = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  CUSTOM: 'CUSTOM',
  NEVER: 'NEVER',
};

const DAY_OF_WEEK = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
};

const convertTime = (schedule: Schedule) => {
  const time = moment(`${schedule.hour}:${schedule.minute}`, timeFormat).format(
    timeFormat,
  );
  return time;
};

export const getScheduleText = (schedule: Schedule): string => {
  const { frequency } = schedule;

  switch (frequency) {
    case FREQUENCY.DAILY: {
      const time = convertTime(schedule);
      return `Every day at ${time}`;
    }
    case FREQUENCY.WEEKLY: {
      const time = convertTime(schedule);
      return `Every ${capitalize(schedule.day.toLowerCase())} at ${time}`;
    }
    case FREQUENCY.CUSTOM: {
      return schedule.cron
        ? `Cron: ${schedule.cron}`
        : 'Invalid cron expression';
    }
    case FREQUENCY.NEVER: {
      return 'Manual refresh only';
    }
    default: {
      return 'Set up schedule';
    }
  }
};

export default function DashboardRefreshTimeModal(props: Props) {
  const { visible, loading, onSubmit, onClose } = props;
  const [form] = Form.useForm();
  const frequency = Form.useWatch('frequency', form);

  const reset = () => {
    form.resetFields();
  };

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        // await onSubmit(values);
        // onClose();
      })
      .catch(console.error);
  };

  return (
    <Modal
      title="Schedule refresh time"
      width={640}
      visible={visible}
      okText="Save"
      onOk={submit}
      onCancel={onClose}
      confirmLoading={loading}
      maskClosable={false}
      destroyOnClose
      centered
      afterClose={reset}
    >
      <Form form={form} preserve={false} layout="vertical">
        <Form.Item label="Frequency" name="frequency">
          <Select
            placeholder="Select frequency"
            options={Object.keys(FREQUENCY).map((key) => ({
              label: capitalize(key),
              value: FREQUENCY[key],
            }))}
          />
        </Form.Item>
        {frequency === FREQUENCY.DAILY && <DailyTimeSelection />}
        {frequency === FREQUENCY.WEEKLY && <WeeklyTimeSelection />}
        {frequency === FREQUENCY.CUSTOM && (
          <Form.Item
            label="Crontab Expression"
            name="crontabExpression"
            initialValue="0 0 * * *"
          >
            <Input style={{ maxWidth: 200 }} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

function DailyTimeSelection() {
  return (
    <Form.Item label="Time" name="time">
      <TimePicker minuteStep={10} format={timeFormat} />
    </Form.Item>
  );
}

function WeeklyTimeSelection() {
  return (
    <Row gutter={16}>
      <Col>
        <Form.Item label="Day" name="day" initialValue={DAY_OF_WEEK.MONDAY}>
          <Select
            style={{ minWidth: 123 }}
            options={Object.keys(DAY_OF_WEEK).map((key) => ({
              label: capitalize(key),
              value: DAY_OF_WEEK[key],
            }))}
          />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item
          label="Time"
          name="time"
          initialValue={moment('00:00', timeFormat)}
        >
          <TimePicker minuteStep={10} format={timeFormat} />
        </Form.Item>
      </Col>
    </Row>
  );
}
