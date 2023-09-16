package com.project.bloomevents.ServiceImpl;


import com.project.bloomevents.DTO.LoginDetailsDTO;
import com.project.bloomevents.DTO.UpdatePasswordRequestDTO;
import com.project.bloomevents.DTO.UserFullDTO;
import com.project.bloomevents.Model.LoginDetails;
import com.project.bloomevents.Model.User;
import com.project.bloomevents.Repository.LoginDetailsRepository;
import com.project.bloomevents.Service.LoginDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginDetailsServiceImpl implements LoginDetailsService {
    @Autowired
    private LoginDetailsRepository loginrepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final AuthenticationManager authenticationManager;

    @Override
    public boolean validateEmail(String email){
        boolean valid=false;
        try{
            LoginDetails logindetails = loginrepo.validateEmail(email);
            if(logindetails==null){
                valid=true;
            }
            return valid;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return valid;
        }
    }

    @Override
    public LoginDetailsDTO getEmailByUserId(int userId) {
        try{
            LoginDetails user = loginrepo.getEmailByUserId(userId);
            if(user!=null){
                return modelMapper.map(user, new TypeToken<LoginDetailsDTO>() {
                }.getType());
            }
            return null;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public int setDefaultPassword(int userId) {
        try{
            LoginDetails logindetails=loginrepo.getEmailByUserId(userId);

            if(logindetails == null){
                return 0;
            }
            String hashedNewPW= passwordEncoder.encode("BloomEvents123@");

            int update=loginrepo.updatePassword(hashedNewPW,logindetails.getLoginId());
            if(update==1){
                return 1;
            }
            else{
                return -2;
            }
        }
        catch(Exception e){
            System.out.println(e.toString());
        }
        return -1;
    }

    public LoginDetailsDTO getLoginDetailById(int loginId){
        try{
            LoginDetails logindetails=loginrepo.getLoginDetailsById(loginId);

            if(logindetails == null){
                return null;
            }
            return modelMapper.map(logindetails, new TypeToken<LoginDetailsDTO>(){}.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
        }
        return null;
    }

    @Override
    public LoginDetailsDTO addLoginDetails(UserFullDTO userdata, User user) throws NoSuchAlgorithmException {
        try{
            String hashedPW= passwordEncoder.encode(userdata.getPassword());
            LoginDetails ld=new LoginDetails();
            ld.setEmail(userdata.getEmail());
            ld.setPassword(hashedPW);
            ld.setUser(user);

            LoginDetails newLd = loginrepo.save(ld);
            return modelMapper.map(ld, new TypeToken<LoginDetailsDTO>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public int updatePassword(int userId, UpdatePasswordRequestDTO updateRequest) throws NoSuchAlgorithmException {
        try{
            LoginDetails ld=loginrepo.getEmailByUserId(userId);
            if(ld != null){
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                ld.getEmail(),
                                updateRequest.getOldPw()
                        )
                );

                String hashedNewPW= passwordEncoder.encode(updateRequest.getNewPw());

                int update=loginrepo.updatePassword(hashedNewPW,ld.getLoginId());
                if(update==1){
                    return 1;
                }
                else{
                    return -2;
                }
            }
            else{
                return -1;
            }
        }
        catch(Exception e){
            System.out.println("err- "+e.toString());
            return 0;
        }
    }

    @Override
    public List<LoginDetailsDTO> getAllLoginDetails() {
        try{
            List<LoginDetails> list = loginrepo.findAll();
            return modelMapper.map(list, new TypeToken<List<LoginDetailsDTO>>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }


}
