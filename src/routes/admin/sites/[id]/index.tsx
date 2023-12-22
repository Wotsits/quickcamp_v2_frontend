import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";
import { useQuery } from "react-query";
import { Site } from "../../../../types";
import { getSite } from "../../../../services/queries/getSite";
import AuthContext from "../../../../contexts/authContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ROUTES } from "../../../../settings";
import ContentBlock from "../../../../components/ContentBlock";

const IndividualSite = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    return <div>Site not found</div>;
  }

  let parsedId = -1;
  try {
    parsedId = parseInt(id);
  } catch (e) {
    return <div>SiteId not valid.</div>;
  }

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading,
    isError,
    data: siteData,
    error,
  } = useQuery<{ data: Site }, Error>(["Site", id], () =>
    getSite({
      token: user.token,
      id: parsedId,
    })
  );

  // -------------
  // RENDER
  // -------------

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div id="site">
      <PageHeader title="Site" subTitle={siteData!.data.name} />

      <ContentBlock title="Site Details">
        <p>ID: {siteData!.data.id}</p>
        <p>Name: {siteData!.data.name}</p>
        <p>Description: {siteData!.data.description}</p>
      </ContentBlock>

      <ContentBlock title="Address">
        <p>Address 1: {siteData!.data.address1}</p>
        <p>Address 2: {siteData!.data.address2}</p>
        <p>Town/City: {siteData!.data.townCity}</p>
        <p>County: {siteData!.data.county}</p>
        <p>Postcode: {siteData!.data.postcode}</p>
        <p>Country: {siteData!.data.country}</p>
        <p>Latitude: {siteData!.data.latitude}</p>
        <p>Longitude: {siteData!.data.longitude}</p>
      </ContentBlock>

      <ContentBlock title="Contact Details">
        <p>Website: {siteData!.data.website}</p>
        <p>Tel: {siteData!.data.tel}</p>
        <p>Email: {siteData!.data.email}</p>
      </ContentBlock>

      <ContentBlock title="Unit Types">
        <TableContainer>
          <Table sx={{ minWidth: 300, width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siteData?.data.unitTypes &&
                siteData.data.unitTypes.map((unitType) => (
                  <TableRow
                    key={unitType.id}
                    className="clickable"
                    hover
                    onClick={() =>
                      navigate(
                        ROUTES.ROOT +
                          ROUTES.ADMIN +
                          ROUTES.SITES +
                          ROUTES.UNIT_TYPES +
                          unitType.id
                      )
                    }
                  >
                    <TableCell>{unitType.id}</TableCell>
                    <TableCell>{unitType.name}</TableCell>
                    <TableCell>{unitType.description}</TableCell>
                    <TableCell>{unitType.siteId}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ContentBlock>
    </div>
  );
};

export default IndividualSite;
