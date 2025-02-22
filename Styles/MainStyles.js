import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  
  Studentdb_container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  Studentdb_scrollContent: {
    padding: 16,
  },
  Studentdb_header: {
    padding: 16,
    backgroundColor: '#43A047',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  Studentdb_headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Studentdb_dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Studentdb_mailboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  Studentdb_headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Studentdb_unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
  Studentdb_unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Studentdb_Container: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Studentdb_announcementBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  Studentdb_meetingBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
    paddingTop: 8,
  },
  Studentdb_Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  Studentdb_paraText: {
    fontSize: 16,
    marginBottom: 8,
  },
  Studentdb_errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  Studentdb_tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#43A047',
    borderRadius: 10,
    padding: 8,
  },
  Studentdb_tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Studentdb_tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  Studentdb_tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  Studentdb_editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Studentdb_useredit: {
    width: 24,
    height: 24,
  },
  Studentdb_link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  Studentdb_bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#43A047',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  Studentdb_navItem: {
    alignItems: 'center',
  },
  Studentdb_navText: {
    fontSize: 12,
    color: '#fff',
  },
  instructordb_container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  instructordb_scrollContent: {
    paddingBottom: 20,
  },
  instructordb_header: {
    padding: 15,
    backgroundColor: '#43A047',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  instructordb_headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructordb_dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructordb_headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructordb_navItem: {
    marginLeft: 20,
  },
  instructordb_mailboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructordb_unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  Instructor_db_button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#388E3C',
    borderRadius: 5,
    alignItems: 'center',
  },
  Instructor_db_buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  instructordb_unreadCount: {
    color: 'white',
    fontWeight: 'bold',
  },
  instructordb_db_Container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructordb_announcementBox: {
    marginBottom: 15,
  },
  instructordb_db_Title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructordb_db_paraText: {
    fontSize: 16,
    lineHeight: 24,
  },
  instructordb_errorText: {
    color: 'red',
    fontSize: 16,
  },
  instructordb_meetingBox: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F0F4C3',
    borderRadius: 8,
  },
  instructordb_link: {
    color: '#1E88E5',
    textDecorationLine: 'underline',
  },
  instructordb_tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#43A047',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  instructordb_tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  instructordb_tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  instructordb_tableRowText: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  instructordb_editIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  Administratordb_container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  Administratordb_scrollContent: {
    padding: 16,
  },
  Administratordb_header: {
    padding: 16,
    backgroundColor: '#43A047',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  Administratordb_headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Administratordb_dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Administratordb_mailboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  Administratordb_headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Administratordb_unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
  Administratordb_unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Administratordb_db_Container: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Administratordb_announcementBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  Administratordb_meetingBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
    paddingTop: 8,
  },
  Administratordb_db_Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  Administratordb_db_paraText: {
    fontSize: 16,
    marginBottom: 8,
  },
  Administratordb_errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  Administratordb_tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#43A047',
    borderRadius: 10,
    padding: 8,
  },
  Administratordb_tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Administratordb_tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  Administratordb_tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  Administratordb_editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Administratordb_useredit: {
    width: 24,
    height: 24,
  },
  Administratordb_link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  Administratordb_bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#43A047',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  Administratordb_navItem: {
    alignItems: 'center',
  },
  Administratordb_navText: {
    fontSize: 12,
    color: '#fff',
  },
  profile_info_container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  profile_info_header: {
    backgroundColor: '#357a38',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profile_info_title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profile_info_card: {
    backgroundColor: '#e7f5e9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profile_info_heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: 5,
  },
  profile_info_classText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a9d8f', // Color for class
  },
  profile_info_expandIcon: {
    fontSize: 16,
    color: '#2a9d8f',
    alignSelf: 'flex-end',
    marginTop: -18,
  },
  profile_info_details: {
    marginTop: 10,
  },
  profile_info_errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },Coordinatordb_container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  Coordinatordb_scrollContent: {
    padding: 16,
  },
  Coordinatordb_header: {
    padding: 16,
    backgroundColor: '#43A047',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  Coordinatordb_headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Coordinatordb_dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Coordinatordb_mailboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  Coordinatordb_headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Coordinatordb_unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
  Coordinatordb_unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Coordinatordb_Container: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Coordinatordb_announcementBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  Coordinatordb_meetingBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
    paddingTop: 8,
  },
  Coordinatordb_Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  Coordinatordb_paraText: {
    fontSize: 16,
    marginBottom: 8,
  },
  Coordinatordb_errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  Coordinatordb_tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#43A047',
    borderRadius: 10,
    padding: 8,
  },
  Coordinatordb_tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Coordinatordb_tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  Coordinatordb_tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  Coordinatordb_editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Coordinatordb_useredit: {
    width: 24,
    height: 24,
  },
  Coordinatordb_link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  Coordinatordb_bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#43A047',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  Coordinatordb_navItem: {
    alignItems: 'center',
  },
  Coordinatordb_navText: {
    fontSize: 12,
    color: '#fff',
  },
  VolunteerRegistration_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  VolunteerRegistration_scrollView: {
    paddingHorizontal: 20,
  },
  VolunteerRegistration_formContainer: {
    marginVertical: 20,
  },
  VolunteerRegistration_header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#357a38',
    marginBottom: 20,
  },
  VolunteerRegistration_subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#357a38',
    marginBottom: 15,
  },
  VolunteerRegistration_input: {
    borderWidth: 1,
    borderColor: '#357a38',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  VolunteerRegistration_permissionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  VolunteerRegistration_permissionText: {
    marginLeft: 10,
  },
  VolunteerRegistration_navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Volunteerdb_container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  Volunteerdb_scrollContent: {
    padding: 16,
  },
  Volunteerdb_header: {
    padding: 16,
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  Volunteerdb_headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Volunteerdb_dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Volunteerdb_mailboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  Volunteerdb_headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Volunteerdb_unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
  Volunteerdb_unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Volunteerdb_Container: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Volunteerdb_announcementBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  Volunteerdb_meetingBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
    paddingTop: 8,
  },
  Volunteerdb_Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#357a38'
    
   
  },
  Volunteerdb_paraText: {
    fontSize: 16,
    marginBottom: 8,
  },
  Volunteerdb_errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  Volunteerdb_tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    padding: 8,
  },
  Volunteerdb_tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  Volunteerdb_tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  Volunteerdb_tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  Volunteerdb_editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Volunteerdb_useredit: {
    width: 24,
    height: 24,
  },
  Volunteerdb_link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  Volunteerdb_bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'darkgreen',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  Volunteerdb_navItem: {
    alignItems: 'center',
  },
  Volunteerdb_navText: {
    fontSize: 12,
    color: '#fff',
  },
  UserProfileScreen_container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
},
UserProfileScreen_header: {
    backgroundColor: '#357a38',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
},
UserProfileScreen_headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
},
UserProfileScreen_profileCard: {
    backgroundColor: '#357a38',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
},
UserProfileScreen_profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
},
UserProfileScreen_profileInfo: {
    flex: 1,
    marginLeft: 20,
},
UserProfileScreen_profileName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
},
UserProfileScreen_profileUsername: {
    color: '#CFCFCF',
    fontSize: 14,
},
UserProfileScreen_editButton: {
    backgroundColor: '#66BB6A',
    borderRadius: 25,
    padding: 8,
},
UserProfileScreen_menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
},
UserProfileScreen_menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
},
UserProfileScreen_menuTextContainer: {
    marginLeft: 20,
},
UserProfileScreen_menuTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
},
UserProfileScreen_sectionTitle: {
    menuSubtitle: {
    fontSize: 12,
    color: '#757575',
    }
},
UserProfileScreen_sectionTitle: {
    sectionTitle: {
    fontSize: 14,
    color: '#888888',
    },
    marginTop: 25,
    marginBottom: 10,
},
Timesheet_container: {
  padding: 20,
  backgroundColor: '#fff',
},
Timesheet_tableHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 8,
  backgroundColor: 'darkgreen',
  borderRadius: 10,
  padding: 8,
},
Timesheet_tableHeaderText: {
  flex: 1,
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#fff',
  paddingHorizontal: 10,
},
Timesheet_headerNumber: {
  flex: 0.5, // Adjust width for number column
},
Timesheet_tableRow: {
  flexDirection: 'row',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
  marginBottom: 4,
},
Timesheet_tableCell: {
  flex: 1,
  textAlign: 'center',
  fontSize: 14,
  paddingVertical: 5,
  paddingHorizontal: 15,
  color: '#000',
},
Timesheet_cellNumber: {
  flex: 0.5, // Adjust width for number column
},
Timesheet_actionButtons: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  flex: 1,
},
Timesheet_formHeader: {
  marginTop: 20,
  fontSize: 18,
  fontWeight: 'bold',
},
Timesheet_input: {
  borderWidth: 1,
  borderColor: '#357a38',
  padding: 10,
  borderRadius: 5,
  marginBottom: 15,
},
Timesheet_pickerContainer: {
  marginVertical: 10,
},
Timesheet_button: {
  marginVertical: 10,
  backgroundColor: '#357a38',
  borderColor: '#fff',
},
Timesheet_buttonText: {
  color: '#fff',
},
StudentUserprofile_container: {
  flex: 1,
  backgroundColor: '#ffffff',
},
StudentUserprofile_rectangleContainer: {
  width: '100%',
  backgroundColor: '#2E7D32',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
},
StudentUserprofile_imageContainer: {
  alignItems: 'center',
  marginTop: 45,
},
StudentUserprofile_image: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#ccc',
},
StudentUserprofile_formContainer: {
  padding: 10,
  alignItems: 'center',
  marginTop: 30,
},
StudentUserprofile_inputContainer: {
  marginBottom: 10,
  width: '90%',
},
StudentUserprofile_label: {
  fontSize: 16,
  color: '#000',
  marginBottom: 5,
},
StudentUserprofile_nonEditableText: {
  fontSize: 16,
  color: '#555',
  padding: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
},
StudentUserprofile_input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  fontSize: 16,
  color: '#000',
},
StudentUserprofile_updateButton: {
  backgroundColor: '#357a38',
  padding: 15,
  borderRadius: 5,
  width: '90%',
  alignItems: 'center',
  marginTop: 20,
},
StudentUserprofile_updateButtonText: {
  color: '#fff',
  fontSize: 16,
},
RegisterConfirmationScreen_container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  backgroundColor: '#ffffff',
},
RegisterConfirmationScreen_logo: {
  width: 100,
  height: 100,
  marginBottom: 20,
},
RegisterConfirmationScreen_thankYouText: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
},
RegisterConfirmationScreen_infoText: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
  color: '#666666',
},
RegisterConfirmationScreen_signInText: {
  fontSize: 16,
  color: '#2E7D32',
  textDecorationLine: 'underline',
},
ResetPasswordScreen_scrollContainer: {
  flexGrow: 1,
  justifyContent: 'center',
  paddingVertical: 20,
},
ResetPasswordScreen_container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#fff',
},
ResetPasswordScreen_headerText: {
  marginTop: 40,
  fontSize: 24,
  fontWeight: 'bold',
  color: '#2E7D32',
  marginBottom: 10,
  textAlign: 'center',
},
ResetPasswordScreen_subHeaderText: {
  fontSize: 16,
  color: '#6A6A6A',
  marginBottom: 30,
  textAlign: 'center',
},
ResetPasswordScreen_messageBox: {
  backgroundColor: '#e0f7fa',
  borderColor: '#0097a7',
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
  marginBottom: 20,
},
ResetPasswordScreen_messageText: {
  color: '#00796b',
  textAlign: 'center',
  fontWeight: 'bold',
},
ResetPasswordScreen_inputContainer: {
  marginBottom: 20,
},
ResetPasswordScreen_inputWrapper: {
  position: 'relative',
},
ResetPasswordScreen_label: {
  marginTop: 20,
  fontSize: 16,
  marginBottom: 8,
},
ResetPasswordScreen_input: {
  height: 50,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 15,
  paddingRight: 50,
  fontSize: 16,
},
ResetPasswordScreen_eyeIcon: {
  position: 'absolute',
  right: 15,
  top: 12,
},
ResetPasswordScreen_button: {
  backgroundColor: '#357a38',
  padding: 15,
  borderRadius: 8,
  marginTop: 10,
},
ResetPasswordScreen_buttonText: {
  color: '#fff',
  textAlign: 'center',
  fontSize: 16,
},
ResetPasswordScreen_forgotPasswordButton: {
  marginTop: 20,
  alignItems: 'center',
},
ResetPasswordScreen_forgotPasswordText: {
  fontSize: 14,
  color: '#357a38',
  textDecorationLine: 'underline',
},
ReportCard_container: {
  flex: 1,
  backgroundColor: '#f9f9f9',
  padding: 20,
},
ReportCard_reportCardContainer: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 15,
  elevation: 3,
  marginBottom: 20,
},
ReportCard_titleReportCard: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#357a38',
  textAlign: 'center',
},
ReportCard_line: {
  borderBottomColor: '#357a38',
  borderBottomWidth: 2,
  marginBottom: 10,
},
ReportCard_tableContainer: {
  width: '100%',
},
ReportCard_tableHeader: {
  flexDirection: 'row',
  backgroundColor: '#357a38',
  justifyContent: 'space-between',
},
ReportCard_tableHeaderText: {
  padding: 8,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  flex: 1, // Use flex for equal spacing
  minWidth: 120, // Minimum width for better alignment
},
ReportCard_tableRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
ReportCard_evenRow: {
  backgroundColor: '#f2f2f2',
},
ReportCard_oddRow: {
  backgroundColor: '#fff',
},
ReportCard_tableCell: {
  padding: 8,
  textAlign: 'center',
  color: '#000',
  flex: 1, // Use flex for equal spacing of columns
  minWidth: 120, // Ensure cells have minimum width for content
},
ReportCard_button: {
  backgroundColor: '#357a38',
  borderRadius: 5,
  paddingVertical: 10,
  alignItems: 'center',
  marginVertical: 10,
},
ReportCard_buttonText: {
  color: 'white',
  fontWeight: 'bold',
},
ReportCard_dropdownContainerReportCard: {
  marginVertical: 10,
},
ReportCard_inputReportCard: {
  borderColor: '#357a38',
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginVertical: 5,
  backgroundColor: '#fff',
},
ReportCard_errorText: {
  color: 'red',
  marginVertical: 5,
  textAlign: 'center',
},
ReportCard_submitButton: {
  backgroundColor: '#357a38',
  borderRadius: 5,
  paddingVertical: 10,
  alignItems: 'center',
  marginVertical: 10,
},
ReportCard_submitButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
MessageCenterScreen_container: {
  flex: 1,
  backgroundColor: '#ffffff', // White background
  padding: 20,
},
MessageCenterScreen_title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#357a38', // Green title
  textAlign: 'center',
  marginBottom: 20,
},
MessageCenterScreen_newMessageButton: {
  backgroundColor: '#357a38', // Green button
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  
},
MessageCenterScreen_toggleButton: {
  color: '#357a38', // Green toggle text
  textAlign: 'center',
  marginBottom: 10,
},
MessageCenterScreen_messageContainer: {
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  backgroundColor: '#f0f8ff', // Light background for messages
},
MessageCenterScreen_messageDetails: {
  marginTop: 10,
},
MessageCenterScreen_detailText: {
  fontSize: 14,
  color: '#000000', // Black text for details
},
MessageCenterScreen_buttonSection: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
MessageCenterScreen_viewButton: {
  backgroundColor: '#4caf50', // Green view button
  padding: 5,
  borderRadius: 5,
  marginRight: 5,
},
MessageCenterScreen_replyButton: {
  backgroundColor: '#2196F3', // Blue reply button
  padding: 5,
  borderRadius: 5,
  marginRight: 5,
},
MessageCenterScreen_deleteButton: {
  backgroundColor: '#fff', //white delete button
  padding: 5,
  borderRadius: 5,
  
},
MessageCenterScreen_buttonText: {
  color: '#ffffff', 
  alignItems: 'center'
},
MessageCenterScreen_modalContent: {
  flex: 1,
  justifyContent: 'center',
  padding: 20,
  backgroundColor: '#ffffff',
},
MessageCenterScreen_modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#357a38', // Green modal title
},
MessageCenterScreen_input: {
  borderWidth: 1,
  borderColor: '#357a38',
  padding: 10,
  borderRadius: 5,
  marginBottom: 15,
},
MessageCenterScreen_textArea: {
  borderWidth: 1,
  borderColor: '#cccccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  height: 100,
  textAlignVertical: 'top',
},
MessageCenterScreen_sendButton: {
  backgroundColor: '#357a38', // Green send button
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  alignItems: 'center'
},
MessageCenterScreen_closeButton: {
  color: '#357a38', // Blue close button text
  textAlign: 'center',
  marginTop: 10,
},
MessageCenterScreen_picker: {
  height: 50,
  width: '100%',
  marginBottom: 10,
},
MessageCenterScreen_trashIcon: {
  width: 20,
  height: 20,
  
},
ClassMaterialScreen_container: {
  flex: 1,
  backgroundColor: '#f4f4f4',
  paddingBottom: 20,
},
ClassMaterialScreen_header: {
  backgroundColor: '#357a38',
  padding: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
},
ClassMaterialScreen_title: {
  color: 'white',
  fontSize: 24,
  fontWeight: 'bold',
},
ClassMaterialScreen_subTitle: {
  color: 'white',
  fontSize: 18,
  marginBottom: 10,
},
ClassMaterialScreen_searchInput: {
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 5,
  elevation: 2, // Add shadow effect
},
ClassMaterialScreen_tableContainer: {
  backgroundColor: '#fff',
  borderRadius: 10,
  margin: 10,
  elevation: 1,
  overflow: 'hidden',
},
ClassMaterialScreen_row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
ClassMaterialScreen_headerRow: {
  backgroundColor: '#357a38',
},
ClassMaterialScreen_headerCell: {
  color: 'white',
  fontWeight: 'bold',
  width: 120,
  textAlign: 'center',
  paddingVertical: 10,
},
ClassMaterialScreen_cell: {
  width: 120,
  textAlign: 'center',
  paddingVertical: 10,
  color: '#333',
},
ClassMaterialScreen_iconContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: 120,
},
ClassMaterialScreen_icon: {
  width: 30,
  height: 30,
  marginLeft: 10,
},
ClassMaterialScreen_noResultText: {
  textAlign: 'center',
  color: '#333',
  marginTop: 20,
},
ForgotPasswordScreen_container: {
  flex: 1,
  justifyContent: 'center',
  padding: 20,
  backgroundColor: '#fff', // White background
},
ForgotPasswordScreen_title: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
  color: '#357a38', // Theme color for the title
},
ForgotPasswordScreen_subtitle: {
  fontSize: 16,
  marginBottom: 30,
  textAlign: 'center',
  color: '#666',
  lineHeight: 22,
},
ForgotPasswordScreen_input: {
  height: 50,
  borderColor: '#ddd',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 15,
  marginBottom: 25,
  fontSize: 16,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
ForgotPasswordScreen_inputError: {
  borderColor: '#ff0000', // Red border if there's an input error
},
ForgotPasswordScreen_button: {
  height: 50,
  backgroundColor: '#357a38', // Theme color for button
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  marginBottom: 20,
  shadowColor: '#357a38',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 10,
  elevation: 5,
},
ForgotPasswordScreen_buttonText: {
  color: '#fff', // White text on button
  fontSize: 18,
  fontWeight: '600',
},
ForgotPasswordScreen_message: {
  fontSize: 16,
  color: '#357a38', // Theme color for message
  marginTop: 20,
  textAlign: 'center',
},
ForgotPasswordScreen_backButton: {
  marginTop: 10,
},
ForgotPasswordScreen_backText: {
  textAlign: 'center',
  color: '#357a38', // Theme color for back text
  fontSize: 16,
  fontWeight: '500',
},
ConfirmationScreen_container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  backgroundColor: '#ffffff',
},
ConfirmationScreen_logo: {
  width: 100,
  height: 100,
  marginBottom: 20,
},
ConfirmationScreen_thankYouText: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
},
ConfirmationScreen_infoText: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
  color: '#666666',
},
ConfirmationScreen_signInText: {
  fontSize: 16,
  color: '#2E7D32',
  textDecorationLine: 'underline',
},
course_container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#ffffff',
},
course_title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
  textAlign: 'center',
  color: '#357a38',
},
course_tableHeader: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  backgroundColor: '#43A047',
  borderRadius: 10,
  paddingVertical: 8,
  paddingHorizontal: 4,
},
course_tableHeaderText: {
  width: 100,
  textAlign: 'left',
  fontWeight: 'bold',
  color: 'white',
  fontSize: 16,
  padding: 8,
},
course_verticalScrollView: {
  maxHeight: 400,
},
course_tableRow: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
  backgroundColor: '#f9f9f9',
},
course_tableCell: {
  width: 100,
  textAlign: 'left',
  fontSize: 14,
  paddingVertical: 6,
  paddingHorizontal: 8,
},
course_loading: {
  flex: 1,
  justifyContent: 'center',
},
AboutUsScreen_container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#f8f8f8', // Light grey background for contrast
},
AboutUsScreen_header: {
  alignItems: 'center',
  marginBottom: 20,
  backgroundColor: '#357a38', // Green background for header
  padding: 20,
  borderRadius: 10,
  elevation: 5, // Shadow effect
},
AboutUsScreen_logo: {
  width: 100, // Adjust based on your logo size
  height: 100,
  marginBottom: 10,
},
AboutUsScreen_title: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#ffffff', // White color for text
},
AboutUsScreen_subtitle: {
  fontSize: 22,
  fontWeight: '600',
  color: '#ffffff', // White color for text
  marginBottom: 10,
},
AboutUsScreen_paragraph: {
  fontSize: 16,
  color: '#333333', // Dark grey color for text
  marginBottom: 10,
  lineHeight: 24, // Spacing for readability
  backgroundColor: '#ffffff', // White background for paragraphs
  padding: 15,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},


});


const pickerSelectStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: '#357a38',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#000',
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#357a38',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#000',
  },
 
};


export default styles;
