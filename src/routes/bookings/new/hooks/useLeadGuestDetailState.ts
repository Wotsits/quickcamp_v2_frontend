import React, { useState } from 'react';
import { NEW_OR_EXISTING } from '../../../../settings';

export const useLeadGuestDetailState = () => {
    const [formGuestType, setFormGuestType] = useState<"new" | "existing">(
        NEW_OR_EXISTING.NEW
      );
      const [formGuestId, setFormGuestId] = useState<number | null>(null);
      const [formGuestFirstName, setFormGuestFirstName] = useState<string>("");
      const [formGuestLastName, setFormGuestLastName] = useState<string>("");
      const [formGuestEmail, setFormGuestEmail] = useState<string>("");
      const [formGuestTel, setFormGuestTel] = useState<string>("");
      const [formGuestAddress1, setFormGuestAddress1] = useState<string>("");
      const [formGuestAddress2, setFormGuestAddress2] = useState<string>("");
      const [formGuestCity, setFormGuestCity] = useState<string>("");
      const [formGuestCounty, setFormGuestCounty] = useState<string>("");
      const [formGuestPostcode, setFormGuestPostcode] = useState<string>("");
      const [formGuestCountry, setFormGuestCountry] = useState<string>("");
    
      const [formGuestSearchFieldContent, setFormGuestSearchFieldContent] =
        useState<string>("");
      const [
        debouncedGuestSearchFieldContent,
        setDebouncedGuestSearchFieldContent,
      ] = useState<string>("");
      
      return {
        formGuestType,
        setFormGuestType,
        formGuestId,
        setFormGuestId,
        formGuestFirstName,
        setFormGuestFirstName,
        formGuestLastName,
        setFormGuestLastName,
        formGuestEmail,
        setFormGuestEmail,
        formGuestTel,
        setFormGuestTel,
        formGuestAddress1,
        setFormGuestAddress1,
        formGuestAddress2,
        setFormGuestAddress2,
        formGuestCity,
        setFormGuestCity,
        formGuestCounty,
        setFormGuestCounty,
        formGuestPostcode,
        setFormGuestPostcode,
        formGuestCountry,
        setFormGuestCountry,
        formGuestSearchFieldContent,
        setFormGuestSearchFieldContent,
        debouncedGuestSearchFieldContent,
        setDebouncedGuestSearchFieldContent,
      }
}