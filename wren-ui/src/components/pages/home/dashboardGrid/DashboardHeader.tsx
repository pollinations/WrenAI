import { Button, Tooltip } from 'antd';
import styled from 'styled-components';
import EditOutlined from '@ant-design/icons/EditOutlined';
import {
  Schedule,
  getScheduleText,
} from '@/components/modals/ScheduleRefreshTimeModal';
import { getCompactTime } from '@/utils/time';

interface Props {
  nextScheduleTime?: string;
  schedule?: Schedule;
  onScheduleRefreshTime: () => void;
}

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 49px;
  padding: 8px 16px;
  background-color: white;
  border-bottom: 1px solid var(--gray-4);
`;

export default function DashboardHeader(props: Props) {
  const { nextScheduleTime, schedule, onScheduleRefreshTime } = props;

  const scheduleTime = getScheduleText(schedule);

  return (
    <StyledHeader>
      <div />
      <div>
        {schedule && (
          <div>
            <div className="text-sm gray-6 text-medium">
              Schedule refresh time
            </div>
            <div className="d-flex align-center gray-8 gx-2">
              {nextScheduleTime ? (
                <Tooltip
                  title={`Next schedule: ${getCompactTime(nextScheduleTime)}`}
                >
                  <span className="cursor-pointer">{scheduleTime}</span>
                </Tooltip>
              ) : (
                scheduleTime
              )}
              <Button
                type="text"
                className="gray-6"
                icon={<EditOutlined />}
                onClick={onScheduleRefreshTime}
              >
                {/* Schedule refresh time */}
              </Button>
            </div>
          </div>
        )}
      </div>
    </StyledHeader>
  );
}
