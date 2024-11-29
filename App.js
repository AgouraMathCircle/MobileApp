import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import VolunteerRegisterScreen from './screens/VolunteerRegisterScreen';
import StudentDashboard from './screens/StudentDashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Studentup from './screens/Studentup';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import MessageCenterScreen from './screens/MessageCenterScreen';
import ReportCard from './screens/ReportCard';
import SubmitScreen from './screens/SubmittedRegistration';
import MaterialScreen from './screens/MaterialScreen';
import Studentuserprofile from './screens/studentUserprofile'
import Aboutus from './screens/About'
import ConfirmationScreen from './screens/ResgisterConfirmationScreen'
import HelpAndSupportScreen from './screens/HelpAndSupportScreen'
import ProfileinformationScreen from './screens/profileinformation';
import courseScreen from './screens/course';
import ForgotConfirmationScreen from './screens/ForgotConfirmationScreen'
import VolunteerDashboard from './screens/VolunteerDashboard';
import AdministratorDashboard from './screens/AdministratorDashboard'
import InstructorDashboard from './screens/InstructorDashboard'
import CoordinatorDashboard from './screens/CoordinatorDashboard'
import Timesheetscreen from './screens/Timesheet'
import AdminReportCard from './screens/AdminReportCard'

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >

        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false}} />
        <Stack.Screen name='Volunteer Registration' component={VolunteerRegisterScreen} />
        <Stack.Screen name='Student Dashboard' component={StudentDashboard} options={{ headerShown: false}}/>
        <Stack.Screen name='Forgot password' component={ForgotPasswordScreen} />
        <Stack.Screen name='User Profile' component={UserProfileScreen} />
        <Stack.Screen name='Reset Password' component= {ResetPasswordScreen} />
        <Stack.Screen name='Message Center' component= {MessageCenterScreen} />
        <Stack.Screen name="Report Card" component={ReportCard} />
        <Stack.Screen name='Registered' component={SubmitScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Documents' component={MaterialScreen} />
        <Stack.Screen name='Studentuserprofile' component={Studentuserprofile} />
        <Stack.Screen name='Aboutus' component={Aboutus} />
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen} />
        <Stack.Screen name='HelpAndSupportScreen' component={HelpAndSupportScreen} />
        <Stack.Screen name='Profileinformation' component={ProfileinformationScreen} />
        <Stack.Screen name='course' component={courseScreen} />
        <Stack.Screen name='ForgotConfirmationScreen' component={ForgotConfirmationScreen} />
        <Stack.Screen name='Volunteer Dashboard' component={VolunteerDashboard} />
        <Stack.Screen name='Administrator Dashboard' component={AdministratorDashboard} />
        <Stack.Screen name='Instructor Dashboard' component={InstructorDashboard} />
        <Stack.Screen name='Coordinator Dashboard' component={CoordinatorDashboard} />
        <Stack.Screen name='Timesheet' component={Timesheetscreen} />
        <Stack.Screen name='Studentup' component={Studentup} />
        <Stack.Screen name='Admin ReportCard' component={AdminReportCard} />

      </Stack.Navigator>
    </NavigationContainer>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});