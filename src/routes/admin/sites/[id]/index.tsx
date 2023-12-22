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
import LabelAndValuePair from "../../../../components/LabelAndValuePair";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "./style.css";

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
        <LabelAndValuePair label="ID" value={siteData!.data.id} />
        <LabelAndValuePair label="Name" value={siteData!.data.name} />
        <LabelAndValuePair
          label="Description"
          value={siteData!.data.description}
        />
      </ContentBlock>

      <ContentBlock title="Address">
        <LabelAndValuePair
          label="Address Line 1"
          value={siteData!.data.address1}
        />
        <LabelAndValuePair
          label="Address Line 2"
          value={siteData!.data.address2}
        />
        <LabelAndValuePair label="Town/City" value={siteData!.data.townCity} />
        <LabelAndValuePair label="County" value={siteData!.data.county} />
        <LabelAndValuePair label="Postcode" value={siteData!.data.postcode} />
        <LabelAndValuePair label="Country" value={siteData!.data.country} />
        <div className="map-container">
          <MapContainer
            center={[siteData!.data.latitude, siteData!.data.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{height: "100%", width: "100%"}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[siteData!.data.latitude, siteData!.data.longitude]}
            />
          </MapContainer>
        </div>
      </ContentBlock>

      <ContentBlock title="Contact Details">
        <LabelAndValuePair label="Website" value={siteData!.data.website} />
        <LabelAndValuePair label="Tel" value={siteData!.data.tel} />
        <LabelAndValuePair label="Email" value={siteData!.data.email} />
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
              {!siteData?.data.unitTypes && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="body1" gutterBottom>
                      Error loading unit types for this site.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {siteData?.data.unitTypes &&
                siteData.data.unitTypes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="body1" gutterBottom>
                        No unit types found for this site.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
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

      <ContentBlock title="Guest Types">
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
              {!siteData?.data.guestTypes && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="body1" gutterBottom>
                      Error loading guest types for this site.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {siteData?.data.guestTypes &&
                siteData.data.guestTypes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="body1" gutterBottom>
                        No guest types found for this site.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              {siteData?.data.guestTypes &&
                siteData.data.guestTypes.map((guestType) => (
                  <TableRow
                    key={guestType.id}
                    className="clickable"
                    hover
                    onClick={() =>
                      navigate(
                        ROUTES.ROOT +
                          ROUTES.ADMIN +
                          ROUTES.SITES +
                          ROUTES.GUEST_TYPES +
                          guestType.id
                      )
                    }
                  >
                    <TableCell>{guestType.id}</TableCell>
                    <TableCell>{guestType.name}</TableCell>
                    <TableCell>{guestType.description}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ContentBlock>

      <ContentBlock title="Equipment Types">
        <TableContainer>
          <Table sx={{ minWidth: 300, width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Icon</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!siteData?.data.equipmentTypes && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body1" gutterBottom>
                      Error loading equipment types for this site.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {siteData?.data.equipmentTypes &&
                siteData.data.equipmentTypes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1" gutterBottom>
                        No equipment types found for this site.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              {siteData?.data.equipmentTypes &&
                siteData.data.equipmentTypes.length > 0 &&
                siteData.data.equipmentTypes.map((equipmentType) => (
                  <TableRow
                    key={equipmentType.id}
                    className="clickable"
                    hover
                    onClick={() =>
                      navigate(
                        ROUTES.ROOT +
                          ROUTES.ADMIN +
                          ROUTES.SITES +
                          ROUTES.EQUIPMENT_TYPES +
                          equipmentType.id
                      )
                    }
                  >
                    <TableCell>{equipmentType.id}</TableCell>
                    <TableCell>{equipmentType.name}</TableCell>
                    <TableCell>{equipmentType.description}</TableCell>
                    <TableCell>{equipmentType.icon}</TableCell>
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
