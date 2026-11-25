import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { X } from 'lucide-react';
import logo from '../assets/wusl ieee cs logo .png';

interface NavItem {
  name: string;
  to: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Events', to: '/events' },
  { name: 'Projects', to: '/projects' },
  { name: 'Team', to: '/team' },
  { name: 'News', to: '/news' },
  {
    name: 'Join Us ↗',
    to: 'https://www.ieee.org/membership/join/index.html',
    isExternal: true,
  },
];

function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event?: Event | React.SyntheticEvent) => {
    if (
      event &&
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // Determine dynamic active route
  const isItemActive = (item: NavItem) => {
    if (item.isExternal) return false;
    if (item.to === '/') {
      return (
        location.pathname === '/' && (!location.hash || location.hash === '')
      );
    }
    if (item.to === '/about') {
      return location.pathname === '/about' || location.hash === '#about';
    }
    if (item.to === '/events') {
      return location.pathname === '/events' || location.hash === '#events';
    }
    return (
      location.pathname === item.to ||
      location.pathname.startsWith(item.to + '/')
    );
  };

  const handleItemClick = (item: NavItem, event: React.MouseEvent) => {
    handleClose(event);
    if (item.isExternal) {
      window.open(item.to, '_blank', 'noopener,noreferrer');
      return;
    }
    // If on homepage and clicking in-page section targets
    if (item.to === '/about' && location.pathname === '/') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (item.to === '/events' && location.pathname === '/') {
      const el = document.getElementById('events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(item.to);
  };

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: { xs: 60, sm: 70 },
        boxSizing: 'border-box',
        px: { xs: 2, sm: 3 },
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      {/* Brand Logo */}
      <Box
        component="a"
        href="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="IEEE Computer Society - WUSL Logo"
          sx={{
            height: { xs: 44, sm: 54 },
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Menu Trigger & Popper Panel */}
      <Box sx={{ position: 'relative' }}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={handleToggle}
          variant="outlined"
          sx={{
            color: open ? '#F39200' : '#111111',
            borderColor: open ? '#F39200' : '#e5e7eb',
            backgroundColor: open ? '#FFFBF5' : '#ffffff',
            fontWeight: 600,
            fontSize: '0.85rem',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            minWidth: 74,
            height: 38,
            px: 2,
            py: 0.75,
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#F39200',
              color: '#F39200',
              backgroundColor: '#FFFBF5',
            },
            '&:focus-visible': {
              outline: '2px solid #F39200',
              outlineOffset: '2px',
            },
          }}
        >
          {open ? <X size={20} strokeWidth={2.2} /> : 'Menu'}
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal={false}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                padding: 16,
              },
            },
          ]}
          sx={{
            zIndex: 1300,
          }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'right top',
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: { xs: 'calc(100vw - 32px)', sm: 330 },
                  maxWidth: 330,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '2px',
                  boxShadow:
                    '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{
                      py: 0,
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {navItems.map((item, index) => {
                      const active = isItemActive(item);
                      return (
                        <React.Fragment key={item.name}>
                          <MenuItem
                            onClick={(e) => handleItemClick(item, e)}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              px: '20px',
                              py: '13.5px',
                              minHeight: 'auto',
                              backgroundColor: 'transparent !important',
                              color: active ? '#F39200' : '#111111',
                              fontWeight: active ? 600 : 500,
                              fontSize: '0.92rem',
                              letterSpacing: '0.01em',
                              transition: 'color 0.15s ease',
                              '&:hover': {
                                backgroundColor: 'transparent !important',
                                color: '#F39200',
                              },
                              '&:focus-visible': {
                                backgroundColor:
                                  'rgba(243, 146, 0, 0.06) !important',
                                outline: 'none',
                              },
                            }}
                          >
                            <span>{item.name}</span>
                            {active && (
                              <Box
                                component="span"
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  backgroundColor: '#F39200',
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </MenuItem>
                          {index < navItems.length - 1 && (
                            <Divider
                              sx={{ borderColor: '#f3f4f6', mx: 0 }}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
}

export default MenuListComposition;
