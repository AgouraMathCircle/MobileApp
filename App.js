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
import StudentRegistration from './screens/StudentRegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >

        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false}} />
        <Stack.Screen name='Student Registration' component={StudentRegistration} />
        <Stack.Screen name='Volunteer Registration' component={VolunteerRegisterScreen} />
        <Stack.Screen name='Student Dashboard' component={StudentDashboard} options={{ headerShown: false}}/>
        <Stack.Screen name='Forgot password' component={ForgotPasswordScreen} />
        <Stack.Screen name='User Profile' component={UserProfileScreen} options={{ headerShown: false}}/>
        <Stack.Screen name='Reset Password' component= {ResetPasswordScreen} options={{ headerShown: false}}/>
        <Stack.Screen name='Message Center' component= {MessageCenterScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Report Card" component={ReportCard} options={{ headerShown: false }}/>
        <Stack.Screen name='Registered' component={SubmitScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Documents' component={MaterialScreen} options={{ headerShown: false}} />
        <Stack.Screen name='Studentuserprofile' component={Studentuserprofile} options={{ headerShown: false}} />
        <Stack.Screen name='Aboutus' component={Aboutus} />
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen} />
        <Stack.Screen name='HelpAndSupportScreen' component={HelpAndSupportScreen} options={{ headerShown: false}} />
        <Stack.Screen name='Profileinformation' component={ProfileinformationScreen} options={{ headerShown: false}} />
        <Stack.Screen name='course' component={courseScreen} options={{ headerShown: false}} />
        <Stack.Screen name='ForgotConfirmationScreen' component={ForgotConfirmationScreen} />
        <Stack.Screen name='Volunteer Dashboard' component={VolunteerDashboard} options={{ headerShown: false}}/>
        <Stack.Screen name='Administrator Dashboard' component={AdministratorDashboard} options={{ headerShown: false}}/>
        <Stack.Screen name='Instructor Dashboard' component={InstructorDashboard} options={{ headerShown: false}}/>
        <Stack.Screen name='Coordinator Dashboard' component={CoordinatorDashboard}options={{ headerShown: false}} />
        <Stack.Screen name='Timesheet' component={Timesheetscreen} options={{ headerShown: false}} />
        <Stack.Screen name='Profile' component={Studentup} options={{ headerShown: false}}/>
        <Stack.Screen name='Admin ReportCard' component={AdminReportCard} options={{ headerShown: false}} />

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