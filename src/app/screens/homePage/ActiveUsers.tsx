import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from "@mui/joy/AspectRatio";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** SELECTOR orqali viewg qilamz **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({  //yuklangan datani retriever orqali qabul qilish
    topUsers,
}));

export default function ActiveUsers() {
    const { topUsers } = useSelector(topUsersRetriever); // top users datasini selector orqali qabul qildik
return (
    <div className={"active-users-frame"}>
        <Container>
            <Stack className={"main"}>
                <Box className={"category-title"}>Active Users</Box>
                <Stack className={"cards-frame"}>
                    <CssVarsProvider>
                        {topUsers.length !== 0 ? (
                          topUsers.map((member: Member) => {
                            const imagePath = `${serverApi}/${member.memberImage}`
                        return (
                             <Card 
                             key={member._id} 
                             variant="outlined" 
                             className={"card"}
                             >
                                 <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={imagePath} style={{borderRadius:"22px"}} alt=""/>
                                    </AspectRatio>
                                 </CardOverflow>

                                 <CardOverflow> 
                                    <Typography className="member-nickname">
                                    {member.memberNick}
                                 </Typography>
                                </CardOverflow>
                               
                                  </Card>
                            )
                         })
                        ) : ( 
                            <Box className="no-data">New products are not available!</Box>
                        )}
                    </CssVarsProvider>
                </Stack>
            </Stack>
        </Container>
    </div>)
}