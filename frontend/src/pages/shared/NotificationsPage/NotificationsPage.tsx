import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";
import { MOCK_NOTIFICATIONS } from "../../../mock/notifications";

export default function NotificationsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#1E293B", mb: 3 }}
      >
        Notifications
      </Typography>

      <Paper sx={{ borderRadius: 3 }}>
        <List>
          {MOCK_NOTIFICATIONS.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No notifications yet"
                secondary="You will see updates about your applications and training here."
              />
            </ListItem>
          ) : (
            MOCK_NOTIFICATIONS.map((n, idx) => (
              <Box key={n.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography sx={{ fontWeight: 600 }}>
                          {n.title}
                        </Typography>
                        {!n.read && (
                          <Chip
                            label="New"
                            size="small"
                            color="primary"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={n.message}
                  />
                </ListItem>
                {idx < MOCK_NOTIFICATIONS.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
}
