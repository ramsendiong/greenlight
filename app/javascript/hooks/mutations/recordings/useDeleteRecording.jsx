// BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
//
// Copyright (c) 2022 BigBlueButton Inc. and by respective authors (see below).
//
// This program is free software; you can redistribute it and/or modify it under the
// terms of the GNU Lesser General Public License as published by the Free Software
// Foundation; either version 3.0 of the License, or (at your option) any later
// version.
//
// Greenlight is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License along
// with Greenlight; if not, see <http://www.gnu.org/licenses/>.

import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from '../../../helpers/Axios';

export default function useDeleteRecording({ recordId, onSettled }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation(
    () => axios.delete(`/recordings/${recordId}.json`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getRecordings']);
        queryClient.invalidateQueries('getRecordingsCount');
        queryClient.invalidateQueries(['getRoomRecordings']);
        queryClient.invalidateQueries('getServerRecordings');
        toast.success(t('toast.success.recording.recording_deleted'));
      },
      onError: () => {
        toast.error(t('toast.error.problem_completing_action'));
      },
      onSettled,
    },
  );
}
