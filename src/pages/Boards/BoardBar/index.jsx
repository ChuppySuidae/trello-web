import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="MERN Stack Board"
          clickable
        // onClick={() => { }}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        // onClick={() => { }}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        // onClick={() => { }}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        // onClick={() => { }}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        // onClick={() => { }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant = 'outlined' startIcon={<PersonAddIcon/>}>Invite</Button>
        <AvatarGroup
          max={3}
          sx={{
            '& .MuiAvatar-root':{
              width: 34,
              height: 34,
              fontSize: 16
            }
          }}
        >
          <Tooltip title="devMern">
            <Avatar 
              alt="Do Trang"
              src='https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/433659183_1557915941716091_5722592036603620650_n.jpg?stp=c0.11.320.320a_cp6_dst-jpg_p320x320&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHMQGRZ3y0xzhvFRSVKW08rlP_esRDMZSCU_96xEMxlIKwGF18fsTh5DJqrgU8DtQU6c6z_AiPLp0BD44iZ0usN&_nc_ohc=_3JtbmTbOzsAb6wW3vB&_nc_ht=scontent.fhan5-9.fna&oh=00_AfATgHs9j_MoG62Vk8bo0qGgFoNGoqdoDUdMJkHVyvlvvQ&oe=6619B833'
            />
          </Tooltip>
          <Tooltip title="devMern">
            <Avatar 
              alt="Mai Phuong"
              src='https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/326479801_520617416719702_4057679633837222434_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QM0eQDQYzqIAb53fNMd&_nc_oc=AdjvoLcN2P42OmjCVCRx-c15K1bd-gC-hOUDoXSP4Oj-HqlMnUiQBAEo-cQR3NgWvD8&_nc_ht=scontent.fhan5-10.fna&oh=00_AfCzQ7PKnJ-gUdFgVKpkojXth7tDqZGgCK1vn8sIL35F_Q&oe=661CC8E9'
            />
          </Tooltip>
          <Tooltip title="devMern">
            <Avatar 
              alt="Trinh Quynh"
              src='https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/428607630_1415423082732776_1739175213339406671_n.jpg?stp=dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=idCVG_TIEk0Ab7I6wjZ&_nc_ht=scontent.fhan5-2.fna&oh=00_AfCZ9SkBrK4FeWSyVc4y_q1oxsdW0LA7v1mSB5q2ASa0cQ&oe=661C99E6'
            />
          </Tooltip>
          <Tooltip title="devMern">
            <Avatar 
              alt="Mai Phuong"
              src=''
            />
          </Tooltip>
          <Tooltip title="devMern">
            <Avatar 
              alt="Mai Phuong"
              src=''
            />
          </Tooltip>
          
        </AvatarGroup>
      </Box>
    </Box>
  )
}
export default BoardBar
